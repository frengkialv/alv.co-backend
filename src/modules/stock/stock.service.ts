import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
    const findDuplicateData = await this.stockRepository
      .createQueryBuilder('stock')
      .where('stock.productId = :productId', {
        productId: createStockDto.productId,
      })
      .andWhere('stock.color = :color', { color: createStockDto.color })
      .andWhere('stock.size = :size', { size: createStockDto.size })
      .getOne();

    if (findDuplicateData) {
      throw new HttpException('Duplicate data', HttpStatus.CONFLICT);
    }

    const createStock = this.stockRepository.create({
      ...createStockDto,
    });

    await this.stockRepository.save(createStock);

    return createStock;
  }
}
