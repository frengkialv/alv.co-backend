import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDtoIn } from './dto/product.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthGuard } from '../auth/auth.guard';
import {
  BasePaginationDto,
  PaginationDtoIn,
} from 'src/common/dto/basePagination.dto';
import { BaseDto } from 'src/common/dto/base.dto';

@Controller('product')
@UseFilters(new HttpExceptionFilter())
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(200)
  async findProduct(@Query() query: PaginationDtoIn) {
    const { datas, currentPage, totalPages } =
      await this.productService.findProduct(query);

    return new BasePaginationDto(
      'Successfully get all pagination product ',
      datas,
      { totalPages, currentPage },
    );
  }

  @Get('/detail/name/:name')
  @HttpCode(200)
  async findProductByName(@Param('name') name: string) {
    const products = await this.productService.getOneByName(name);

    return new BaseDto('Successfully get product by name', products);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async create(@Body() payload: CreateProductDtoIn) {
    const createProduct = await this.productService.create(payload);

    return new BaseDto('Successfully create new product', createProduct);
  }
}
