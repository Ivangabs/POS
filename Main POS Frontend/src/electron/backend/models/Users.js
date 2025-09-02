import dbClient from '../db.js';
import bcrypt from 'bcrypt';
import env from "dotenv";

env.config({path : './../../../.env'});

const outputTemp = {
    data : null,
    message : null,
    error : null,
    success : false
}

export async function findUserbyId(id){
    const output = outputTemp;
    try {
        const qResult = await dbClient.query(
            "SELECT * FROM users WHERE userid = $1",
            [id]);
        if (qResult.rows.length > 0){
            output.data = qResult.rows[0];
            output.message = "User found"
            output.success = true;
        } else {
            output.message = "User not found"
            output.success = false;
        }
    } catch (error) {
        console.error(error);
        output.error = "Can't access database"
    } finally {
        return output;
    }
}

export async function findUserbyUsername(username){
    const output = outputTemp;
    try {
        const qResult = await dbClient.query(
            "SELECT * FROM users WHERE username = $1",
            [username]);
        if (qResult.rows.length > 0){
            output.data = qResult.rows[0];
            output.message = "User found"
            output.success = true;
        } else {
            output.message = "User not found"
            output.success = false;
        }
    } catch (error) {
        console.log(error);
        output.error = "Can't access database"
    } finally {
        return output;
    }
}

export async function createUser(username, password, role){
    const output = outputTemp;
    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.PG_SALTROUNDS));
        try {
            const qResult = await dbClient.query(
                "INSERT INTO users (username, pass, role) VALUES ($1, $2, $3) RETURNING *",
                [username, hashedPassword, role]
            );  
            if (qResult.rows.length > 0){
                output.data = qResult.rows[0];
                output.success = true;
                output.message = "User successfully created";
            }  
        } catch (error) {
            if (error.code === '23505'){
                output.error = "User already exists";
            } else {
                output.error = "Could not insert to database";
            }
            
        } 
    } catch (error) {
        output.error = "Could not hash password";
    } finally {
        return output;
    }
}

export async function getAllUsers(){
    const output = outputTemp;
    try {
        const qResult = await dbClient.query(
            "SELECT userid, username, role, is_active, last_login FROM users ");
        output.data = qResult.rows;
        output.message = "User found"
        output.success = true;
       
    } catch (error) {
        // console.log(error);
        output.error = "Can't access database"
    } finally {
        return output;
    }
}