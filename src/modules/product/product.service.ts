import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CategoryForDisplay, CreateProductDtoIn } from './dto/product.dto';
import { PaginationDtoIn, Sort } from 'src/common/dto/basePagination.dto';
import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findProduct(query: PaginationDtoIn) {
    const { limit, offset } = PaginationService.getPagination(
      query.page,
      query.size,
    );

    const queeryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.stock', 'stock')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.categoryProduct', 'categoryProduct')
      .leftJoinAndSelect('product.productImage', 'productImage');

    // If get by brand
    if (query.brand) {
      queeryBuilder.andWhere('product.brandId = :brandId', {
        brandId: query.brand,
      });
    }

    // If get by category
    if (
      query.category &&
      query.category !== 'on-sale' &&
      query.category !== 'new-arrivals'
    ) {
      queeryBuilder.andWhere('categoryProduct.name = :categoryName', {
        categoryName: query.category,
      });
    }

    // Take the picture only with imgIndex = 1
    queeryBuilder.andWhere('productImage.imageIndex = :imgIndex', {
      imgIndex: 1,
    });

    // If more than 1 query color
    if (query.color && Array.isArray(query.color)) {
      queeryBuilder.andWhere('stock.color IN (:...colors)', {
        colors: [...query.color],
      });
    }

    // If just one query color
    if (query.color && typeof query.color === 'string') {
      queeryBuilder.andWhere('stock.color = :color', { color: query.color });
    }

    // If more than 1 query size
    if (query.productSize && Array.isArray(query.productSize)) {
      queeryBuilder.andWhere('stock.size IN (:...sizes)', {
        sizes: [...query.productSize],
      });
    }

    // If just one query size
    if (query.productSize && typeof query.productSize === 'string') {
      queeryBuilder.andWhere('stock.size = :size', { size: query.productSize });
    }

    queeryBuilder.andWhere('stock.stock > :minStock', { minStock: 0 });

    //Query for price
    if (query.price) {
      // Memisahkan string berdasarkan karakter '-'
      let parts = query.price.split('-');

      // Mengambil nilai sebelum '-' (bagian pertama)
      let minPrice = parts[0];

      // Mengambil nilai sesudah '-' (bagian kedua)
      let maxPrice = parts[1];

      queeryBuilder.andWhere(
        `
        (CASE 
           WHEN product.discountByPercent IS NULL 
           THEN product.price 
           ELSE product.price - (product.price * product.discountByPercent / 100)
         END) BETWEEN :minPrice AND :maxPrice
      `,
        { minPrice: minPrice, maxPrice: maxPrice },
      );
    }

    // Sort query
    if (query.sort === Sort.POPULARITY) {
      queeryBuilder.orderBy('product.sold', 'DESC');
    } else if (query.sort === Sort.NEWEST) {
      queeryBuilder.orderBy('product.releaseDate', 'DESC');
    } else if (query.sort === Sort.LATEST) {
      queeryBuilder.orderBy('product.releaseDate', 'ASC');
    }

    const [products, totalData] = await queeryBuilder
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    let datas = [...products];

    if (query.sort === Sort['PRICE-HIGH-TO-LOW']) {
      datas = products.sort((a, b) => {
        const priceA = a.price;
        const discountA = a.discountByPercent ? a.discountByPercent / 100 : 0;
        const effectivePriceA = priceA * (1 - discountA);

        const priceB = b.price;
        const discountB = b.discountByPercent ? b.discountByPercent / 100 : 0;
        const effectivePriceB = priceB * (1 - discountB);

        return effectivePriceB - effectivePriceA;
      });
    } else if (query.sort === Sort['PRICE-LOW-TO-HIGH']) {
      datas = products.sort((a, b) => {
        const priceA = a.price;
        const discountA = a.discountByPercent ? a.discountByPercent / 100 : 0;
        const effectivePriceA = priceA * (1 - discountA);

        const priceB = b.price;
        const discountB = b.discountByPercent ? b.discountByPercent / 100 : 0;
        const effectivePriceB = priceB * (1 - discountB);

        return effectivePriceA - effectivePriceB;
      });
    }

    const metadata = PaginationService.getPaginationMetadata({
      totalData,
      page: query.page,
      limit: limit,
    });

    return { datas, ...metadata };
  }

  async getProductForDisplay(category: CategoryForDisplay, totalData: number) {
    const queryBuilders = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.stock', 'stock')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.categoryProduct', 'categoryProduct')
      .leftJoinAndSelect('product.productImage', 'productImage')
      .andWhere('productImage.imageIndex = :imgIndex', {
        imgIndex: 1,
      });

    if (category === CategoryForDisplay['NEW-ARRIVAL']) {
      queryBuilders.orderBy('product.releaseDate', 'DESC');
    } else if (category === CategoryForDisplay['ON-SALE']) {
      queryBuilders.andWhere('product.discountByPercent IS NOT NULL');
      queryBuilders.orderBy('product.discountByPercent', 'DESC');
    } else {
      throw new HttpException('Wrong category', HttpStatus.NOT_FOUND);
    }

    const products = await queryBuilders.take(totalData).getMany();

    return products;
  }

  async getOneByName(name: string) {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.stock', 'stock')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.productImage', 'productImage')
      .leftJoinAndSelect('product.productSold', 'productSold')
      .where('product.name = :productName', { productName: name })
      .andWhere('stock.stock > :minStock', { minStock: 0 })
      .getOne();

    return products;
  }

  async create(dtoIn: CreateProductDtoIn) {
    const findDuplicateProduct = await this.productRepository.find({
      where: {
        name: dtoIn.name.toLowerCase(),
      },
    });

    if (findDuplicateProduct.length > 0) {
      throw new HttpException('Duplicate name', HttpStatus.CONFLICT);
    }

    const createProduct = this.productRepository.create({
      ...dtoIn,
      name: dtoIn.name.toLowerCase(),
    });

    await this.productRepository.save(createProduct);

    return createProduct;
  }
}
