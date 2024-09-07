import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDtoIn {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNumber()
  discountByPercent: number | null;

  @IsNotEmpty()
  @IsString()
  material: string;

  @IsString()
  categoryProductId: string;

  @IsNotEmpty()
  @IsString()
  brandId: string;

  @IsNotEmpty()
  releaseDate: Date;
}
