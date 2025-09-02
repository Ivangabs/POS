import express from "express";
import { getAllUsers } from "../models/Users.js";

const router = express.Router();

// Register
router.get("/", async (req, res) => {
    const allUsers = await getAllUsers(); 
    // console.log(allUsers);
    allUsers.success? 
        res.json(allUsers)
        :
        res.status(500).json(allUsers);
});

export default router;