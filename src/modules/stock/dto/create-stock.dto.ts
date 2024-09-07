import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
