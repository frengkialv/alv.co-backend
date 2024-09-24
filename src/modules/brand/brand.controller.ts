import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandDtoIn } from './dto/brand.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthGuard } from '../auth/auth.guard';
import { BaseDto } from 'src/common/dto/base.dto';

@Controller('brand')
@UseFilters(new HttpExceptionFilter())
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async createBrand(@Body() payload: BrandDtoIn) {
    const createBrand = await this.brandService.create(payload.name);

    return new BaseDto('Successfully create new Brand', createBrand);
  }

  @Get()
  @HttpCode(200)
  async getAllBrand() {
    const getAllBrand = await this.brandService.getAllBrand();

    return new BaseDto('Successfully get all Brand', getAllBrand);
  }
}
