import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhotoProductService } from './photo-product.service';
import { CreatePhotoProductDto } from './dto/create-photo-product.dto';
import { UpdatePhotoProductDto } from './dto/update-photo-product.dto';

@Controller('photo-product')
export class PhotoProductController {
  constructor(private readonly photoProductService: PhotoProductService) {}

  @Post()
  create(@Body() createPhotoProductDto: CreatePhotoProductDto) {
    return this.photoProductService.create(createPhotoProductDto);
  }

  @Get()
  findAll() {
    return this.photoProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoProductDto: UpdatePhotoProductDto) {
    return this.photoProductService.update(+id, updatePhotoProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoProductService.remove(+id);
  }
}
