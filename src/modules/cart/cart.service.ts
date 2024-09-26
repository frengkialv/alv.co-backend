import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/cart.dto';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../product/entity/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(createCartDto: CreateCartDto, userId: string) {
    const findDuplicateCart = await this.cartRepository.findOne({
      where: {
        userId: userId,
        productId: createCartDto.productId,
        color: createCartDto.color,
        size: createCartDto.size,
      },
    });

    const validateProductStock = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.stock', 'stock')
      .where('product.id = :productId', { productId: createCartDto.productId })
      .andWhere('stock.color = :color', { color: createCartDto.color })
      .andWhere('stock.size = :size', { size: createCartDto.size })
      .getOne();

    if (!validateProductStock) {
      throw new HttpException(
        'This item is no longer available',
        HttpStatus.NOT_FOUND,
      );
    }

    const quantityItemLeft = validateProductStock.stock[0].stock;

    if (quantityItemLeft < createCartDto.quantity) {
      throw new HttpException(
        `This item only has ${quantityItemLeft} stocks left`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      findDuplicateCart &&
      quantityItemLeft < createCartDto.quantity + findDuplicateCart.quantity
    ) {
      throw new HttpException(
        `This item only has ${quantityItemLeft} stocks left`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (findDuplicateCart) {
      await this.cartRepository.update(findDuplicateCart.id, {
        quantity: createCartDto.quantity + findDuplicateCart.quantity,
      });

      const nextCart = await this.cartRepository.findOne({
        where: {
          id: findDuplicateCart.id,
        },
      });

      return nextCart;
    }

    const nextCart = this.cartRepository.create({
      ...createCartDto,
      userId: userId,
    });

    await this.cartRepository.save(nextCart);

    return nextCart;
  }

  async updateQuantityCart(id: string, quantity: number, userId: string) {
    // For validate the cart owner
    const validateOwnerCart = await this.cartRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!validateOwnerCart) {
      throw new HttpException('Failed authorization', HttpStatus.UNAUTHORIZED);
    }

    // For validate product stock
    const validateProductStock = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.stock', 'stock')
      .where('product.id = :productId', {
        productId: validateOwnerCart.productId,
      })
      .andWhere('stock.color = :color', { color: validateOwnerCart.color })
      .andWhere('stock.size = :size', { size: validateOwnerCart.size })
      .getOne();

    if (!validateProductStock) {
      throw new HttpException(
        'This item is no longer available',
        HttpStatus.NOT_FOUND,
      );
    }

    const quantityItemLeft = validateProductStock.stock[0].stock;

    if (quantityItemLeft < quantity) {
      throw new HttpException(
        `This item only has ${quantityItemLeft} stocks left`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.cartRepository.update(id, {
      quantity: quantity,
    });

    const nextCart = await this.cartRepository.findOne({
      where: {
        id: id,
      },
    });

    return nextCart;
  }

  async findCart(userId: string) {
    const carts = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.product', 'product')
      .leftJoinAndSelect('product.stock', 'stock')
      .leftJoinAndSelect('product.productImage', 'productImage')
      .leftJoinAndSelect('product.categoryProduct', 'categoryProduct')
      .where('cart.userId = :userId', { userId: userId })
      .andWhere('productImage.imageIndex = :imageIndex', { imageIndex: 1 })
      .andWhere('CAST(cart.color AS text) = CAST(stock.color AS text)')
      .andWhere('CAST(cart.size AS text) = CAST(stock.size AS text)')
      .andWhere('cart.quantity <= stock.stock')
      .getMany();

    return carts;
  }

  async deleteCart(id: string, userId: string) {
    const authorizationDelete = await this.cartRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!authorizationDelete) {
      throw new HttpException('Failed authorization', HttpStatus.UNAUTHORIZED);
    }

    const cart = await this.cartRepository.delete({
      id,
    });

    return cart;
  }
}
