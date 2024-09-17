import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { ProductEntity } from '../product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
