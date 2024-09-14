import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
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
import { ProductImageModule } from './modules/product-image/product-image.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    UserModule,
    ProductModule,
    BrandModule,
    StockModule,
    CategoryProductModule,
    CartModule,
    ProductSoldModule,
    ProductImageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
