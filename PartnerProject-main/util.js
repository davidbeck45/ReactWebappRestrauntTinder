import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export const connectMongodb = async () => {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  return client.db('store');
}
export const Restaurants = mongoose.model('restaurants', {
  _id: mongoose.SchemaTypes.String,
  name: mongoose.SchemaTypes.String
});

export const MainUser = mongoose.model('mainuser', {
  _id: mongoose.SchemaTypes.String,
  name: mongoose.SchemaTypes.String,
  phone_number: mongoose.SchemaTypes.Number,
  restaurants: mongoose.SchemaTypes.Array,
});

export const Item = mongoose.model('items', {
  _id: mongoose.SchemaTypes.String,
  name: mongoose.SchemaTypes.String,
  quantity: mongoose.SchemaTypes.Number,
  price: mongoose.SchemaTypes.Number,
  store_id: mongoose.SchemaTypes.String,
});

