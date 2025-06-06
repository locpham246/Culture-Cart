import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controller/product.js";
import { getStoreOptionsForProduct } from "../controller/storeProduct.js";

const router = express.Router();

router.post("/", createProduct); 
router.get("/", getProducts); 
router.get("/:id", getProductById);
router.put("/:id", updateProduct); 
router.delete("/:id", deleteProduct); 
router.get('/:productId/store-options', getStoreOptionsForProduct);


export default router;