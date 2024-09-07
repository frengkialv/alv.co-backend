import { Test, TestingModule } from '@nestjs/testing';
import { ProductSoldController } from './product-sold.controller';
import { ProductSoldService } from './product-sold.service';

describe('ProductSoldController', () => {
  let controller: ProductSoldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSoldController],
      providers: [ProductSoldService],
    }).compile();

    controller = module.get<ProductSoldController>(ProductSoldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
