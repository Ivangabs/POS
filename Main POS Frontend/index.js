import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import env from "dotenv";
env.config();
// Debugging
const DEBUG = true;

// import ejs from "ejs";
const port = 3000;
const app = express();
const saltRounds = 10;
const dbClient = new pg.Pool({
    user: "postgres",
    host : "localhost",
    database: "pos",
    password: process.env.DB_SECRET,
    port: 5432
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000 * 60 * 60 * 4
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.render("login.ejs", {error : null})
});
app.get("/dashboard", (req,res) => {
    if (req.isAuthenticated()){
        res.render("index.ejs", {} );
    } else {
        res.render("login.ejs", {error : "Login first???"})
    }
});
app.get("/signUp", (req, res) => {
    res.render("signUp.ejs", {error :null});
});

app.post("/login", passport.authenticate("local", {
    successRedirect : "/dashboard",
    failureRedirect : ".login"
}));
app.post ("/signUp", async (req, res) => {
    const {username, password} = req.body;
    try {
        const checkResult = await dbClient.query(
            "SELECT * FROM users WHERE username = $1",
            [username]);
        if (checkResult.rows.length > 0 ) {
            if (DEBUG) console.log ("Error : Username already exists");
            res.render("signUp.ejs", {error : "Username already exists"});
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    if (DEBUG) console.log ("Error : Problem hashing password");
                } else {
                    try {
                        const result = await dbClient.query(
                            "INSERT INTO users (username, pass, role) VALUES ($1, $2, $3) RETURNING *",
                            [username, hash, "EMPLOYEE"]
                        );  
                        res.render("login.ejs", {message : "Successfully created account"});
                    } catch (error) {
                        if (DEBUG) console.log ("Error : Cannot add password to database");
                        res.render("signUp.ejs", {error : "Error adding to database. Please submit again."});
                    }
                }
            });
        }
    } catch (error){
        if (DEBUG) console.log ("Error : Cannot access database");
        res.render("signUp.ejs", {error : "Error accessing database. Please submit again."});
    }
});

passport.use(new Strategy(async function verify(username, password, cb){
    try {
        const loginUsername = username;
        const loginPassword = password;
        const user = await dbClient.query('SELECT * FROM users WHERE username = $1', [loginUsername]);
        const storedHashedPassword = user.rows[0].pass;
        if (storedHashedPassword){
            bcrypt.compare(loginPassword, storedHashedPassword, (err, isPassMatch) => {
                if (err) {
                    if (DEBUG) console.log ("Error : Cannot Compare Passwords");
                    return cb(err);
                } else {
                    if (isPassMatch){
                        console.log("Matches");
                        return cb(null, user)
                    } else {
                        if (DEBUG) console.log ("Error : Incorrect Password");
                        return cb(null, false);
                    }
                }
            });
        } else {
            if (DEBUG) console.log ("Error : Username does not exist");
            return cb("User not found");
        }
    } catch (error) {
        if (DEBUG) console.log ("Error : Cannot access database");
        return cb(err);
    }
}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
});

app.listen(port, "::", () => {
    console.log(`Listening at port ${port}`);
})