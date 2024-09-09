import { UploadedFile } from '@nestjs/common';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductImageDtoIn {
  @IsNotEmpty()
  @IsUUID()
  productId: string;
}
