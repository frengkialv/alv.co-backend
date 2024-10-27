import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductImageEntity } from './entities/product-image.entity';
import { InjectRepository } from '@nestjs/typeorm';
const ImageKit = require('imagekit');

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
  ) {}

  async uploadImageToImageKit(base64: string, fileName: string) {
    try {
      const imagekit = new ImageKit({
        publicKey: process.env.PUBLIC_KEY_IMAGEKIT,
        privateKey: process.env.PRIVATE_KEY_IMAGEKIT,
        urlEndpoint: process.env.URL_ENDPOINT_IMAGEKIT,
      });

      const response = await imagekit.upload({
        file: base64, // Required
        fileName: fileName, // Required
        tags: [fileName],
      });

      return response.url;
    } catch (error) {
      console.log('🚀 ~ ProductImageService ~ error:', error);
      throw new HttpException(
        'Bad request when upload image',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createProductImage(
    base64: string,
    productId: string,
    fileName: string,
    imageIndex: number,
  ) {
    const findDuplicateData = await this.productImageRepository
      .createQueryBuilder('productImage')
      .where('productImage.productId = :productId', { productId: productId })
      .andWhere('productImage.imageIndex = :imageIndex', {
        imageIndex: imageIndex,
      })
      .getOne();

    if (findDuplicateData) {
      throw new HttpException('Duplicate data', HttpStatus.CONFLICT);
    }

    const imageUrl: string = await this.uploadImageToImageKit(base64, fileName);

    const nextProductImage = this.productImageRepository.create({
      imgSrc: imageUrl,
      productId: productId,
      imageIndex: imageIndex,
    });

    await this.productImageRepository.save(nextProductImage);

    return nextProductImage;
  }
}
