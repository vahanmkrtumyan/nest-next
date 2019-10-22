import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryController } from './Categories.controller';
import { CategoriesService } from './Categories.service';
import { CategorySchema } from './categories.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoriesService],
})
export class CategoriesModule {}