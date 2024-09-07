import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDtoIn } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findProductByStock() {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.stock', 'stock')
      .where('stock.color = :color', { color: 'black' })
      .getMany();

    return products;
  }

  async findProductByParamId(brandId: string) {
    const products = await this.productRepository.find({
      where: {
        brandId,
      },
      relations: {
        brand: true,
      },
    });

    return products;
  }

  async create(dtoIn: ProductDtoIn) {
    const createProduct = this.productRepository.create({
      ...dtoIn,
    });

    await this.productRepository.save(createProduct);

    return createProduct;
  }
}
