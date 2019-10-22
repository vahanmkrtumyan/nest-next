import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from '../app.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
//controllers: [AppController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}