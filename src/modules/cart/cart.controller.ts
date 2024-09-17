import {
  Controller,
  Get,
  Post,
  Body,
  UseFilters,
  Req,
  UseGuards,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateQuantityCart } from './dto/cart.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthGuard, IAuthRequest } from '../auth/auth.guard';
import { BaseDto } from 'src/common/dto/base.dto';

@Controller('cart')
@UseFilters(new HttpExceptionFilter())
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createCartDto: CreateCartDto,
    @Req() request: IAuthRequest,
  ) {
    const cart = await this.cartService.create(createCartDto, request.user.id);

    return new BaseDto('Successfully create or update cart', cart);
  }

  @Put('/quantity/:id')
  @UseGuards(AuthGuard)
  async updateQuantityCart(
    @Body() quantity: UpdateQuantityCart,
    @Req() request: IAuthRequest,
    @Param('id') id: string,
  ) {
    const cart = await this.cartService.updateQuantityCart(
      id,
      quantity.quantity,
      request.user.id,
    );

    return new BaseDto('Successfully update cart', cart);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findCart(@Req() request: IAuthRequest) {
    const carts = await this.cartService.findCart(request.user.id);

    return new BaseDto('Successfully get cart', carts);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteCart(@Req() request: IAuthRequest, @Param('id') id: string) {
    const cart = await this.cartService.deleteCart(id, request.user.id);

    return new BaseDto('Successfully delete cart', cart);
  }
}
