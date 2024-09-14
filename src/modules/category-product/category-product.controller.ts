import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CreateCategoryProductDtoIn } from './dto/category-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { BaseDto } from 'src/common/dto/base.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('category-product')
@UseFilters(new HttpExceptionFilter())
export class CategoryProductController {
  constructor(
    private readonly categoryProductService: CategoryProductService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async create(@Body() createCategoryProductDtoIn: CreateCategoryProductDtoIn) {
    const createCategory = await this.categoryProductService.create(
      createCategoryProductDtoIn,
    );
    return new BaseDto('Successfully create new Category', createCategory);
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    const categoriesProduct = await this.categoryProductService.findAll();

    return new BaseDto(
      'Successfully get all Category Product',
      categoriesProduct,
    );
  }
}
