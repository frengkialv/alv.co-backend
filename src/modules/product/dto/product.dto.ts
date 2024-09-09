import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

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

  @IsUUID()
  categoryProductId: string;

  @IsNotEmpty()
  @IsString()
  brandId: string;

  @IsNotEmpty()
  releaseDate: Date;
}
