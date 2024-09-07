import { PartialType } from '@nestjs/mapped-types';
import { CreateProductSoldDto } from './create-product-sold.dto';

export class UpdateProductSoldDto extends PartialType(CreateProductSoldDto) {}
