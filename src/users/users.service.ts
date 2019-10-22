import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type User = any;

@Injectable()
export class UsersService {
  // private readonly users: User[];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
  }

  async insertUser(username: string, password: string) {
    const newUser = new this.userModel({ username, password });
    const result = await newUser.save();
    return result;
  }


  

  async findOne(userId: string): Promise<User | undefined> {
    const user = await this.findUser(userId) 
    return user
  }



  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findOne({ username: id }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
