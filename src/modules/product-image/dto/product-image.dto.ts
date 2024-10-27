import { UploadedFile } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateProductImageDtoIn {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  imageIndex: number | string;

  @IsString()
  @IsNotEmpty()
  fileName: string;
}
