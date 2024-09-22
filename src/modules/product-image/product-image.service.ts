import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductImageEntity } from './entities/product-image.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
  ) {}

  async createProductImage(
    base64: string,
    productId: string,
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

    const nextProductImage = this.productImageRepository.create({
      imgSrc: base64,
      productId: productId,
      imageIndex: imageIndex,
    });

    await this.productImageRepository.save(nextProductImage);

    return nextProductImage;
  }
}
