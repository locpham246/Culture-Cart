import express from 'express';
import Item from '../models/Item.js';

const ItemRouter = express.Router();

ItemRouter.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.q || ''; 
    if (searchQuery.length <= 2) {
      return res.json([]);
    }
    const items = await Item.find({ name: new RegExp(searchQuery, 'i') });
    if (items.length === 0) {
      return res.json([]);
    }
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error searching items', error: err });
  }
});

ItemRouter.get('/search', async (req, res) => {
    try {
      const { query } = req.query;  
      const items = await Item.find({
        name: { $regex: query, $options: 'i' }  
      }).exec();
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  

export { ItemRouter };
