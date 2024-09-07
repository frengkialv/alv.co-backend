import { Injectable } from '@nestjs/common';
import { CreatePhotoProductDto } from './dto/create-photo-product.dto';
import { UpdatePhotoProductDto } from './dto/update-photo-product.dto';

@Injectable()
export class PhotoProductService {
  create(createPhotoProductDto: CreatePhotoProductDto) {
    return 'This action adds a new photoProduct';
  }

  findAll() {
    return `This action returns all photoProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photoProduct`;
  }

  update(id: number, updatePhotoProductDto: UpdatePhotoProductDto) {
    return `This action updates a #${id} photoProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} photoProduct`;
  }
}
