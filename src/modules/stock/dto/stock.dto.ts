import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Color, Size } from '../entities/stock.entity';

export class CreateStockDto {
  @IsNotEmpty()
  color: Color;

  @IsNotEmpty()
  size: Size;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  productId: string;
}

export class GetStockDtoIn {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  color: Color;

  @IsNotEmpty()
  size: Size;
}
