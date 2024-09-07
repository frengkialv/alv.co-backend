import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './entity/brand.entity';
import { Repository } from 'typeorm';
import { BrandDtoIn } from './dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {}

  async create(dtoIn: BrandDtoIn) {
    const findBrand = await this.brandRepository.find({
      where: {
        ...dtoIn,
      },
    });

    if (findBrand.length > 0) {
      throw new HttpException('Duplicate entry', HttpStatus.CONFLICT);
    }

    const createBrand = this.brandRepository.create({
      ...dtoIn,
    });

    await this.brandRepository.save(createBrand);

    return createBrand;
  }
}
