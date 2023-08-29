import * as mongoose from 'mongoose';

export const RidesSchema = new mongoose.Schema({
  name: String,
  date: Date,
  price: String,
  imageUrl: String,
});
