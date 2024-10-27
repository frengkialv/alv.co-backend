import { Express } from 'express';
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDtoIn } from './dto/product-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseDto } from 'src/common/dto/base.dto';

@Controller('product-image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('imgSrc'))
  async createProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    imgSrc: Express.Multer.File,
    @Body() payload: CreateProductImageDtoIn,
  ) {
    const base64String = imgSrc.buffer.toString('base64');

    const createProductImage =
      await this.productImageService.createProductImage(
        base64String,
        payload.productId,
        payload.fileName,
        Number(payload.imageIndex),
      );

    return new BaseDto('Success create new product photo', createProductImage);
  }
}
