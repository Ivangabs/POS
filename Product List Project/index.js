//Flags
const DEBUG = true;
const RECREATE_TABLE = false;
//Native node modules
import fs from "fs";
import path from "path";

//Axios
import axios from "axios";

//Finds the directory of where this running file is
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Connect Telegram Bot
import TelegramBot from "node-telegram-bot-api";
const TOKEN = '8496910527:AAFHGM9PP6UskdbjnmRB4xHWV_HSze7Lh_c';
const bot = new TelegramBot(TOKEN, { polling: true });

//Media Interface
import { createCanvas, loadImage } from "canvas";
import { BrowserMultiFormatReader } from "@zxing/browser";

//Database
const productImgDir = "./Images/Products"
var messageMatch = {
    message : "These could be related to these item/s: \n",
    matches : null,
    exists : false
}
import pg from 'pg';
import stringSimilarity from "string-similarity";
const PGUSERNAME = "postgres";
const PGPASS = "Ivangabs08";
const dbName = "pos";
const tableName = "products"
const productIDField = "ProductID";

const dbClient = new pg.Pool({
  user : PGUSERNAME,
  host : "localhost",
  password : PGPASS,
  database : dbName,
  port : 5432
});
if (RECREATE_TABLE) await dbClient.query(`DROP TABLE IF EXISTS ${tableName};`);
const existDBTable = await checkDBTableExists(dbName, tableName);
if (!existDBTable.db && DEBUG) console.log("CREATE DB FIRST!!!");
try {
    var schema = fs.readFileSync("./customLibrary/query/createTable.sql", "utf8");
    schema = schema.replace(/{{products_table}}/g, tableName)
    await dbClient.query(schema);
} catch (error) {
    if (DEBUG) console.log(error);
} 

// User states
import blankSteps from './customLibrary/objects/steps.js';
import { isNumeric } from "./customLibrary/functions/helperFunctions.js";
var steps = blankSteps;
var stepNum = 0;
// Bot Listeners
bot.on("message", async (msg) => {
    // Check if restarting process
    if (msg.text === "/start" || msg.text === "/restart") return;
    const chatId = msg.chat.id;
    if (isMsgSkip(msg)){
        steps[stepNum].data = null;
        msgNextStep(chatId, steps[++stepNum]);
    } else if (checkMsgFormat(msg, steps[stepNum], "photo")) { 
        if (steps[stepNum].name === "Barcode"){
            steps[stepNum].data = await decodeBarcodeFromTelegramBuffer(msg);
            if (steps[stepNum].data) {
                msgNextStep(chatId, steps[++stepNum]);
            } else {
                bot.sendMessage(chatId, "⚠️ Couldn't read a barcode. Please try again.");
            }
        } else if (steps[stepNum].name === "ImagePath"){
            try {
                const response = await getTelegramImgApiResponse(msg, 2);
                const fileComp = `../Images/Products/${steps[0].data}.png`;
                fs.writeFileSync(fileComp, response.data);
                steps[stepNum].data = fileComp;
                msgNextStep(chatId, steps[++stepNum]);
            } catch (error) {
                console.log(error);
                bot.sendMessage(chatId, "⚠️ Error saving image, please send another image.");
            }
        }
    } else if (checkMsgFormat(msg, steps[stepNum], "text")) {
        if (steps[stepNum].name === "ProductName"){
            const productIDField_L = productIDField.toLowerCase();
            const productMatch_L = steps[stepNum].name.toLowerCase();
            const detailOne_L = "PackSize".toLowerCase();
            const detailTwo_L = "UnitOfMeasure".toLowerCase()
            const result = await dbClient.query(`SELECT ${productIDField_L}, ${productMatch_L}, ${detailOne_L}, ${detailTwo_L} FROM ${tableName}`);
            const existingProducts = result.rows;
            if (existingProducts.length === 0) {
                if (DEBUG) console.log("No products in database yet.");
            } else {
                const productNames = existingProducts.map(p => p[productMatch_L]);
                const matches = stringSimilarity.findBestMatch(msg.text, productNames);
                const topMatches = matches.ratings
                .map((r, i) => ({
                    productid: existingProducts[i][productIDField_L],
                    productname: existingProducts[i][productMatch_L],
                    productPackSize: existingProducts[i][detailOne_L],
                    productUnit: existingProducts[i][detailTwo_L],
                    similarity: r.rating,
                }))
                .sort((a, b) => b.similarity - a.similarity) // highest first
                .slice(0, 3); // top 3 only
                topMatches.forEach((val, i) => {
                    messageMatch.message += `[${val["productid"]}] ${val.productname} - ${val.productPackSize} per ${val.productUnit}\n`;
                    messageMatch.exists = true;
                });
                messageMatch.matches = topMatches;
            }  
        }
        steps[stepNum].data = msg.text;
        msgNextStep(chatId, steps[++stepNum]);
    } else if (checkMsgFormat(msg, steps[stepNum], "number")) {
        steps[stepNum].data = msg.text;
        msgNextStep(chatId, steps[++stepNum]);
    } else {
        bot.sendMessage(chatId, "⚠️ Invalid Input. Try Again.");
        msgNextStep(chatId, steps[stepNum]);
    }
    if (stepNum + 1 === steps.length && steps[stepNum].name === "done") {
        const created_at = new Date().toISOString();
        const updated_at = new Date().toISOString();
        const FILE_PATH = steps[1].data;
        try {
            const result = await cloudinary.uploader.upload(FILE_PATH, {
                folder: "POS_Images",
            });
            var imgURL = result.secure_url;
        } catch (err) {
            console.error("❌ Upload failed:", err.message);
        }
        try {
            const stepNames = steps.map((step) => step.name).slice(0,-1);
            const qinserts = stepNames.join(",");
            const qvalues = Array.from(Array(stepNames.length + 1).keys()).join(",$").slice(2);
            console.log(qinserts);
            console.log(qvalues);
            const query = `
                INSERT INTO products (${qinserts})
                VALUES (${qvalues})
                RETURNING ProductID;
            `;
            const values = steps.map(step => step.data).slice(0,-1);
            const result = await dbClient.query(query, values);
            console.log(result.rows[0]);
        } catch (error) {
            if (DEBUG) console.log(error);
            bot.sendMessage(chatId, "Error adding to database");
        } finally {
            if (messageMatch.exists){
                const matchOptions = {
                    inline_keyboard: 
                        messageMatch.matches.map((match) =>{
                            return [{
                                text: `[${match.productid}] ${match.productname}: ${match.productPackSize} per ${match.productUnit}`,
                                callback_data :`${match.productid}`
                            }]
                        })
                };
                console.log(messageMatch.matches.map((match) =>{
                            return [{
                                text: `[${match.productid}] ${match.productname}: ${match.productPackSize} per ${match.productUnit}`,
                                callback_data :`${match.productid}`
                            }]
                        }));
                bot.sendMessage(chatId, messageMatch.message, matchOptions);
            } else {
                steps = blankSteps;
                stepNum = 0;
                bot.sendMessage(chatId, "You may start process again");
            }
        }

    }
});
bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const choice = callbackQuery.data;
    bot.answerCallbackQuery(callbackQuery.id); // Acknowledge click
    steps[stepNum].data = choice;
    msgNextStep(message.chat.id, steps[++stepNum]);
});

bot.onText(/\/start|\/restart/, (msg) => {
    const chatId = msg.chat.id;
    fs.rm("*.png", () => {});
    steps = blankSteps;
    stepNum = 0;
    msgNextStep(chatId, steps[stepNum]);
});

// Functions ###############################################################################################
async function checkDBTableExists(dbName, tableName) {
    var dbTable = {db: false, table : false};
    try {
        const defaultClient = new pg.Client({
            user: PGUSERNAME,
            host: 'localhost',
            database: 'postgres', // default db (always exists)
            password: PGPASS,
            port: 5432,
        });
        await defaultClient.connect();
        // Step 2: check if database exists
        const dbRes = await defaultClient.query(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            [dbName]
        );
        await defaultClient.end();
        if (dbRes.rowCount === 0) {
            if (DEBUG) console.log(`❌ Database "${dbName}" does not exist.`);
        } else {
            if (DEBUG) console.log(`✅ Database "${dbName}" exists.`);
            dbTable.db = true;
        }

        // Step 3: now connect to the target database
        const targetClient = new pg.Client({
            user: PGUSERNAME,
            host: 'localhost',
            database: dbName,
            password: PGPASS,
            port: 5432,
        });
        await targetClient.connect();

        // Step 4: check if the table exists
        const tableRes = await targetClient.query(
            `SELECT EXISTS (
                SELECT 1 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = $1
            )`,
            [tableName]
        );
        await targetClient.end();
        const tableExists = tableRes.rows[0].exists;

        if (tableExists) {
            if (DEBUG) console.log(`✅ Table "${tableName}" exists in database "${dbName}".`);
            dbTable.table = true;
        } else {
            if (DEBUG) console.log(`❌ Table "${tableName}" does not exist in database "${dbName}".`);
        }
        return { dbExists: true, tableExists };
    } catch (err) {
        if (DEBUG) console.error("Error:", err);
    } finally {
        return dbTable;
    }
}
function checkMsgFormat(msg, step, type) {
    switch (type) {
        case "photo"    :  
            // console.log(msg.photo && (step.type === "photoOnly" || step.type === "photoSkip") ? "photo" : "nophoto");
            return msg.photo && (step.type === "photoOnly" || step.type === "photoSkip") ? true : false;
        case "number"   :  
            // console.log("Is number?");
            return isNumeric(msg.text) && (step.type === "numberOnly" || step.type === "numberSkip") ? true : false;
        case "text"     :  
            // console.log("Is text?", step.type);
            return msg.text && (step.type === "textOnly" || step.type === "textSkip") ? true : false;
        default : return false;
    }
}

function isMsgSkip(msg){
    return msg.text === "Skip"
}
function msgNextStep(chatId, step){
    var options = null;
    switch (step.type){
        case "photoSkip": case "numberSkip": case "textSkip":
            options = {};
            options.reply_markup = {
                keyboard : [steps[stepNum].options[0].map((obj) => obj.text)],
                one_time_keyboard: true,
                resize_keyboard: true
            };
            break;
        case "choiceOnly" :
            options = {};
            options.reply_markup = {
                inline_keyboard: steps[stepNum].options
            };
            break;
        default :
            break;
    }
    if (options) bot.sendMessage(chatId, steps[stepNum].message, options)
    else bot.sendMessage(chatId, steps[stepNum].message);
}

async function getTelegramImgApiResponse(msg, imgSize){
    const fileId = msg.photo[msg.photo.length - imgSize].file_id;     //Using "-3" since it has a small image size
    const file = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${file.file_path}`;
    return await axios({ url: fileUrl, responseType: "arraybuffer" });
}
async function decodeBarcodeFromTelegramBuffer(msg) {
  try {
    const filePath = "barcode.png";
    const response = await getTelegramImgApiResponse(msg, 1);
    fs.writeFileSync(filePath, response.data);
    const image = await loadImage(filePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const reader = new BrowserMultiFormatReader();
    const result = await reader.decodeFromCanvas(canvas);
    fs.rm('barcode.png', () => {});
    return result.getText();
  } catch (error) {
    return null;
  }
}
