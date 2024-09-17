import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Color, Size } from 'src/modules/stock/entities/stock.entity';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(Color)
  color: Color;

  @IsNotEmpty()
  @IsEnum(Size)
  size: Size;

  @IsNotEmpty()
  @IsUUID()
  productId: string;
}

export class UpdateQuantityCart {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
