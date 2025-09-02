import dbClient from '../db.js';
import env from "dotenv";
import TelegramBot from "node-telegram-bot-api";

env.config({path : './../../../.env'});

const outputTemp = {
    data : null,
    message : null,
    error : null,
    success : false
}

let bot;

export async function startBot(botKey){
    const output = outputTemp;
    try {
        bot = new TelegramBot(botKey, {
            polling: { autoStart: false, params: {}, skip_pending_updates: true },  
        });

        // Before starting polling, clear backlog
        bot.getUpdates().then((updates) => {
        if (updates.length > 0) {
            const lastUpdateId = updates[updates.length - 1].update_id;
            bot.options.polling.params = { offset: lastUpdateId + 1 };
            // console.log(`Skipping ${updates.length} pending updates — starting from offset ${lastUpdateId + 1}`);
        }
        bot.startPolling();
        });

        bot.on("message", async (msg)=>{
            console.log(msg.text);
        });
        output.message = "TelegramBot Started";
        output.success = true;x
    } catch (err) {
        output.error = err;
    } finally {
        return output;
    }
    
}
export async function stopBot(){
    const output = outputTemp;
    if (bot) {
        await bot.stopPolling().catch(()=>{});
        bot = null;
    }
    output.message = "TelegramBot Ended";
    output.success = true;
    return output;
    
}