import { Injectable } from '@nestjs/common';
import { CreateProductImageDtoIn } from './dto/product-image.dto';
import { Repository } from 'typeorm';
import { ProductImageEntity } from './entities/product-image.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
  ) {}

  async createProductImage(base64: string, productId: string) {
    const nextProductImage = this.productImageRepository.create({
      imgSrc: base64,
      productId: productId,
    });

    await this.productImageRepository.save(nextProductImage);

    return nextProductImage;
  }
}
