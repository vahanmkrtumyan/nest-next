import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  
  import { CategoriesService } from './categories.service';
  
  @Controller('categories')
  export class CategoryController {
    constructor(private readonly categoriesService: CategoriesService) {}
  
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addCategory(
      @Body('type') categoryType: string,
      @Body('priority') categoryPriority: number,
    ) {
      const generatedId = await this.categoriesService.insertCategory(
        categoryType,
        categoryPriority,
      );
      return { id: generatedId };
    }
  
    @Get()
    getAllProducts() {
      return this.categoriesService.getProducts();
    }
  
    @Get(':id')
    getCategory(@Param('id') categoryId: string) {
      return this.categoriesService.getSingleCategory(categoryId);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async updateCategory(
        @Body('type') categoryType: string,
        @Body('priority') categoryPriority: number,
        @Body('id') categoryId: string,
    ) {
      await this.categoriesService.updatedCategory(
          categoryId,
        categoryType,
        categoryPriority,
      );
      return null;
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async removeProduct(@Param('id') categoryId: string) {
      await this.categoriesService.deleteCategory(categoryId);
      return null;
    }
  }