import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from './entities/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    private stockRepository: Repository<StockEntity>,
  ) {}

  async create(createStockDto: CreateStockDto) {
    const createStock = this.stockRepository.create({
      ...createStockDto,
    });

    await this.stockRepository.save(createStock);

    return createStock;
  }

  findAll() {
    return `This action returns all stock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
