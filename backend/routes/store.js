import express from 'express';
import {createStore, getStores, getStoreById, updateStore, deleteStore, getNearbyStores, getAllStores} from '../controller/store.js';


const router = express.Router();

router.post('/', createStore); 
router.get('/', getStores); 
router.get('/nearby', getNearbyStores); 
router.get('/:id', getStoreById); 
router.put('/:id', updateStore); 
router.delete('/:id', deleteStore); 


export default router;