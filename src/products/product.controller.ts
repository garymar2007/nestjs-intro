import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('price') price: number,
  ): any {
    const generatedId = this.productService.insertProduct(title, desc, price);
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getSingleProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('price') price: number,
  ) {
    return this.productService.updateProduct(prodId, title, desc, price);
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.productService.deleteProduct(prodId);
    return null;
  }
}
