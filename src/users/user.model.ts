import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

export interface User extends mongoose.Document {
    id: string;
    user: string;
    password: string;
  }