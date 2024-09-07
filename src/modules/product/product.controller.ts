import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDtoIn } from './dto/product.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('product')
@UseFilters(new HttpExceptionFilter())
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/stock')
  @HttpCode(200)
  async findByStock() {
    const findProductByParamId = await this.productService.findProductByStock();

    return findProductByParamId;
  }

  @Get('/:brandId')
  @HttpCode(200)
  async findByBrandId(@Param('brandId') brandId: string) {
    const findProductByParamId =
      await this.productService.findProductByParamId(brandId);

    return findProductByParamId;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() payload: ProductDtoIn) {
    const createProduct = await this.productService.create(payload);

    return createProduct;
  }
}
