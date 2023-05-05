import { Router } from 'express';
import ItemsRouter from './items.js';
import { MainUser } from './util.js';
import {v4 as uuidv4} from 'uuid';




const UserRouter = Router();
ItemsRouter.mergeParams = true;
UserRouter.use("/:store_id/items", ItemsRouter);


// GET list of users
UserRouter.get('/', async (req, res) => {
  try {
    const stores = await MainUser.find().exec();
    
    res.json(stores);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
 
});

//get info on single user
UserRouter.get('/:store_id', async (req, res) => {
  const store_id = req.params.store_id;

  try {
    const store = await MainUser.findById(store_id).exec();

    if (store === null) {
      res.status(404).json({ message: 'Store not found' });
      return;
    }

    res.json(store);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});



// Add new user
UserRouter.post('/new', async (req, res) => {
  
  try {
    const name = {
      _id: uuidv4(),
      name: req.body.name,
      phone_number: req.body.num,
      restaurants: [],
      
    };
    console.log('req body user: ', req.body);
    const store = await new MainUser(name).save();
    console.log(store);
    res.json({
      status: "201",
      message: 'created'
    });
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});


export default UserRouter;
