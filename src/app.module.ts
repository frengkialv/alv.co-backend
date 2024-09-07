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
import { CartModule } from './modules/cart/cart.module';
import { ProductSoldModule } from './modules/product-sold/product-sold.module';
import { ProductRatingModule } from './modules/product-rating/product-rating.module';
import { ProductImageModule } from './modules/product-image/product-image.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    UserModule,
    ProductModule,
    BrandModule,
    StockModule,
    CategoryProductModule,
    CartModule,
    ProductSoldModule,
    ProductRatingModule,
    ProductImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
