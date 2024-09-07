import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { dataSourceOptions } from 'db/data-source';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { StockModule } from './modules/stock/stock.module';
import { CategoryProductModule } from './modules/category-product/category-product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    UserModule,
    ProductModule,
    BrandModule,
    StockModule,
    CategoryProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
