import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsNull } from 'typeorm';
import { CategoryProduct } from '../entities/category-product.entity';

export class CreateCategoryProductDtoIn {
  @IsString()
  @IsNotEmpty()
  @IsEnum(CategoryProduct)
  name: CategoryProduct;
}
