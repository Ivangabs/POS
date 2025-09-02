import express from "express";
import { startBot, stopBot } from "../models/Bots.js";

const router = express.Router();

// Register
router.post("/", async (req, res) => {
    var botRes;
    if (req.body.isBotOn) {
        botRes = await startBot(req.body.botKey)
    } else {
        botRes = await stopBot()
    }
    botRes.success? 
        res.json(botRes)
        :
        res.status(500).json(botRes);
});

export default router;