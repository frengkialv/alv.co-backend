import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { StockEntity } from './entities/stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
