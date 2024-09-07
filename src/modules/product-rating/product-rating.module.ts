import { Module } from '@nestjs/common';
import { ProductRatingService } from './product-rating.service';
import { ProductRatingController } from './product-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRatingEntity } from './entities/product-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRatingEntity])],
  controllers: [ProductRatingController],
  providers: [ProductRatingService],
})
export class ProductRatingModule {}
