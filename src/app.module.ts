import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
 import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductsModule} from './products/products.module'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import {FileModule} from './files/files.module';


@Module({
  imports: [ProductsModule, MongooseModule.forRoot('mongodb+srv://vahanmkrtumyan:Vahan1990@cluster0-93irs.mongodb.net/test?retryWrites=true&w=majority'), AuthModule, UsersModule, CategoriesModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
