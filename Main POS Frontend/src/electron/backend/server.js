import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({path : './../../.env'});
import { initPassport } from "./passportConfig.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import botRoutes from "./routes/bots.js";



const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(
session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie : {
        maxAge : 1000 * 60 * 60 * 24 // 1 day
    }
})
);

app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bots", botRoutes);

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Auth server running on port ${PORT}`));
