import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryProductDtoIn } from './dto/category-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryProductEntity } from './entities/category-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryProductService {
  constructor(
    @InjectRepository(CategoryProductEntity)
    private readonly categoryProductRepository: Repository<CategoryProductEntity>,
  ) {}

  async create(createCategoryProductDtoIn: CreateCategoryProductDtoIn) {
    const findDuplicateCategory = await this.categoryProductRepository.find({
      where: {
        name: createCategoryProductDtoIn.name,
      },
    });

    if (findDuplicateCategory.length > 0) {
      throw new HttpException('Duplicate data', HttpStatus.CONFLICT);
    }

    const createCategory = await this.categoryProductRepository.create({
      name: createCategoryProductDtoIn.name,
    });

    await this.categoryProductRepository.save(createCategory);

    return createCategory;
  }

  async findAll() {
    const categoriesProduct = await this.categoryProductRepository.find();

    return categoriesProduct;
  }
}
