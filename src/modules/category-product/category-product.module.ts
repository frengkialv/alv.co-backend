import { Module } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CategoryProductController } from './category-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryProductEntity } from './entities/category-product.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryProductEntity]), AuthModule],
  controllers: [CategoryProductController],
  providers: [CategoryProductService],
})
export class CategoryProductModule {}
