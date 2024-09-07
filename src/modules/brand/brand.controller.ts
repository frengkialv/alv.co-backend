import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandDtoIn } from './dto/brand.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('brand')
@UseFilters(new HttpExceptionFilter())
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @HttpCode(201)
  async createBrand(@Body() payload: BrandDtoIn) {
    const createBrand = await this.brandService.create(payload);

    return createBrand;
  }
}
