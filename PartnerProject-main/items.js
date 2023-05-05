import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { Item } from './util.js';
import { MongoClient } from 'mongodb';
//const ItemsRouter = Router();
const ItemsRouter = Router({ mergeParams: true });





// Get all items for a given store
ItemsRouter.get('/', async (req, res) => {
  try {
    const items = await Item.find().exec();
    res.json(items);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }

});

ItemsRouter.get('/swipe', async (req, res) => {
  
  try {
    const items = await Item.find().exec();
    res.json(items);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }

});

// Get a single item by its ID
ItemsRouter.get('/:item_id', async (req, res) => {
  try {
    const itemId = req.params.item_id;
    const item = await Item.findOne({ _id: itemId }).exec();
    if (!item) {
      res.status(404).send('Item not found');
      return;
    }
    res.json(item);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal server error');
  }
});


// Create a new item for a given store
ItemsRouter.post('/new', async (req, res) => {

  try {
 
    const storeId = req.params.store_id;

    const item = {
      _id: uuidv4(),
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      store_id: storeId
    };
    
    const i = await new Item(item).save();
    console.log('db item',i);
    res.status(201).json(item);
    
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal server error');
  }
});

export default ItemsRouter;


