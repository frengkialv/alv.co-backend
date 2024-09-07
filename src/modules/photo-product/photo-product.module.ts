import { Module } from '@nestjs/common';
import { PhotoProductService } from './photo-product.service';
import { PhotoProductController } from './photo-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoProductEntity } from './entities/photo-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoProductEntity])],
  controllers: [PhotoProductController],
  providers: [PhotoProductService],
})
export class PhotoProductModule {}
