import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../brand/entity/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, BrandEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
