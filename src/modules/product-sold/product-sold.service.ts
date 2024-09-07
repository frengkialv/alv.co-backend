import { Injectable } from '@nestjs/common';
import { CreateProductSoldDto } from './dto/create-product-sold.dto';
import { UpdateProductSoldDto } from './dto/update-product-sold.dto';

@Injectable()
export class ProductSoldService {
  create(createProductSoldDto: CreateProductSoldDto) {
    return 'This action adds a new productSold';
  }

  findAll() {
    return `This action returns all productSold`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productSold`;
  }

  update(id: number, updateProductSoldDto: UpdateProductSoldDto) {
    return `This action updates a #${id} productSold`;
  }

  remove(id: number) {
    return `This action removes a #${id} productSold`;
  }
}
