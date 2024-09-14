import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { PaginationDtoIn } from 'src/common/dto/basePagination.dto';

export class CreateProductDtoIn {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  discountByPercent: number | null;

  @IsNotEmpty()
  @IsString()
  material: string;

  sold?: number;

  @IsUUID()
  categoryProductId: string;

  @IsNotEmpty()
  @IsString()
  brandId: string;

  @IsNotEmpty()
  releaseDate: Date;
}

export class GetProductPaginationByCategory extends PaginationDtoIn {
  @IsNotEmpty()
  @IsUUID()
  categoryId: number;
}
