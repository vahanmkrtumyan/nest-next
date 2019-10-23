import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Grid } from 'gridfs-stream';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import { methodOverride } from 'method-override';
const crypto = require('crypto');
const fs = require('fs');

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    file: any,
    title: string,
    desc: string,
    price: number,
    category: string,
  ) {
    console.log(file[0], 'asddsss');

    const newProduct = new this.productModel({
      file: file[0].filename,
      title,
      description: desc,
      price,
      category,
    });
    const result = await newProduct.save();
    return result._id as string;
  }

  async getProducts() {
    const products = await this.productModel
      .find()
      .populate('category')
      .exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
      category: prod.category,
      file: prod.file,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
    category: string,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (category) {
      updatedProduct.category = category;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    try {
      fs.unlinkSync(`files/${product.file}`);
    } catch (err) {
      console.error(err);
    }
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
