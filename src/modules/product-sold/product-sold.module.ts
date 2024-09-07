import { Module } from '@nestjs/common';
import { ProductSoldService } from './product-sold.service';
import { ProductSoldController } from './product-sold.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSoldEntity } from './entities/product-sold.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSoldEntity])],
  controllers: [ProductSoldController],
  providers: [ProductSoldService],
})
export class ProductSoldModule {}
