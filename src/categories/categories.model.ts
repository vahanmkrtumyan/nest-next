import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  type: { type: String, required: true },
  priority: { type: Number, required: true },
});

export interface Category extends mongoose.Document {
  id: string;
  type: string;
  priority: number;
}
