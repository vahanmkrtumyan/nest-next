import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  file: {type: String, required: false},
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});
export interface Product extends mongoose.Document {
  id: string;
  file: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

export const FileSchema = new mongoose.Schema({
  file: {type: Buffer, required: false}
});

export interface File extends mongoose.Document {
  file: Buffer;
}