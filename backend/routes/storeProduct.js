import express from 'express';
import {createStoreProduct, getStoreProducts, getStoreProductById, updateStoreProduct,deleteStoreProduct, getProductSearchSummary } from '../controller/storeProduct.js';

const router = express.Router();
router.post('/', createStoreProduct); 
router.get('/', getStoreProducts); 
router.get('/search-summary', getProductSearchSummary); 
router.get('/:id', getStoreProductById); 
router.put('/:id', updateStoreProduct); 
router.delete('/:id', deleteStoreProduct); 

export default router;