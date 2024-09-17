import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseFilters,
  UseGuards,
  Query,
  Get,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto, GetStockDtoIn } from './dto/stock.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { BaseDto } from 'src/common/dto/base.dto';
import { AuthGuard } from '../auth/auth.guard';
import { query } from 'express';

@Controller('stock')
@UseFilters(new HttpExceptionFilter())
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async create(@Body() createStockDto: CreateStockDto) {
    const stocks = await this.stockService.create(createStockDto);

    return new BaseDto('Succssfully create new stock', stocks);
  }

  @Get('quantity')
  @HttpCode(200)
  async getQuantityStock(@Query() query: GetStockDtoIn) {
    const stock = await this.stockService.getQuantityStock(query);

    return new BaseDto('Succssfully get stock', stock);
  }
}
