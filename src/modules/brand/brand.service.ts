import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './entity/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {}

  async create(name: string) {
    const findBrand = await this.brandRepository.find({
      where: {
        name: name.toLowerCase(),
      },
    });

    if (findBrand.length > 0) {
      throw new HttpException('Duplicate data', HttpStatus.CONFLICT);
    }

    const createBrand = this.brandRepository.create({
      name: name.toLowerCase(),
    });

    await this.brandRepository.save(createBrand);

    return createBrand;
  }

  async getAllBrand() {
    const brands = await this.brandRepository.find();

    return brands;
  }
}
