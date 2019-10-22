import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from './categories.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async insertCategory(type: string, priority: number) {
    const newProduct = new this.categoryModel({
      type,
      priority,
    });
    const result = await newProduct.save();
    return result._id as string;
  }

  async getCategories() {
    const products = await this.categoryModel.find().exec();
    return products.map(category => ({
      id: category.id,
      type: category.type,
      priority: category.priority,
    }));
  }

  async getSingleCategory(categoryId: string) {
    const category = await this.findCategory(categoryId);
    return {
      id: category.id,
      type: category.type,
      priority: category.priority,
    };
  }

  async updatedCategory(categoryId: string, type: string, priority: number) {
    const updatedCategory = await this.findCategory(categoryId);
    if (type) {
      updatedCategory.type = type;
    }
    if (priority) {
      updatedCategory.priority = priority;
    }
    updatedCategory.save();
  }

  async deleteCategory(categoryId: string) {
    const result = await this.categoryModel
      .deleteOne({ _id: categoryId })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findCategory(id: string): Promise<Category> {
    let category;
    try {
      category = await this.categoryModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!category) {
      throw new NotFoundException('Could not find product.');
    }
    return category;
  }
}
