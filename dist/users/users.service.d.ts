import { Model } from 'mongoose';
export declare type User = any;
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    insertUser(username: string, password: string): Promise<string>;
    findOne(userId: string): Promise<User | undefined>;
    private findUser;
}
