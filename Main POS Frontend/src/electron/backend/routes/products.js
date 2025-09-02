import express from "express";
import { getAllProducts, updateProduct } from "../models/Products.js";

const router = express.Router();

// Register
router.get("/", async (req, res) => {
    const allProducts = await getAllProducts(); 
    // console.log(allUsers);
    allProducts.success? 
        res.json(allProducts)
        :
        res.status(500).json(allProducts);
});

router.put("/:id", async (req,res)=>{
    // console.log("hi? Hello");
    // console.log(req.params.id);
    // console.log(req.body);
    const upd = await updateProduct(req.params.id, req.body);
    console.log(upd);
    upd.success?
        res.json(upd) :
        res.status(500).json(upd.error);
});

export default router;