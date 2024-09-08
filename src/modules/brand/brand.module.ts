import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandEntity } from './entity/brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity]), AuthModule],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
