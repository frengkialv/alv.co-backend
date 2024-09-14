import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { BaseDto } from './base.dto';

export enum Sort {
  POPULARITY = 'popularity',
  NEWEST = 'newest',
  LATEST = 'latest',
  'PRICE-HIGH-TO-LOW' = 'priceHighToLow',
  'PRICE-LOW-TO-HIGH' = 'priceLowToHigh',
}

export class PaginationDtoIn {
  @IsOptional()
  keyword: string;

  @IsOptional()
  price: string;

  @IsOptional()
  color: string | string[];

  @IsOptional()
  productSize: string | string[];

  @IsOptional()
  @IsEnum(Sort)
  sort: Sort;

  @IsOptional()
  @IsUUID()
  brand: string;

  @IsOptional()
  category: string;

  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  size: number;
}

export class BasePaginationDto<T> extends BaseDto<T> {
  currentPage: number;

  totalPages: number;

  constructor(
    message: string,
    data: T,
    paginationMetaData: {
      currentPage: number;
      totalPages: number;
    },
  ) {
    super(message, data);
    this.currentPage = paginationMetaData.currentPage;
    this.totalPages = paginationMetaData.totalPages;
  }
}
