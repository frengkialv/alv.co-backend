import { Module } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CategoryProductController } from './category-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryProductEntity } from './entities/category-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryProductEntity])],
  controllers: [CategoryProductController],
  providers: [CategoryProductService],
})
export class CategoryProductModule {}
