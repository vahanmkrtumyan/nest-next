import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  file: {type: Buffer, required: false}
});

export interface File extends mongoose.Document {
  file: Buffer;
}