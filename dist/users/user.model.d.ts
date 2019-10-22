import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any>;
export interface User extends mongoose.Document {
    id: string;
    user: string;
    password: string;
}
