import { CommonEntity } from 'src/common/entity/common.entity';
import { ProductEntity } from 'src/modules/product/entity/product.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum CategoryProduct {
  'T_SHIRTS' = 't-shirts',
  SHOES = 'shoes',
  ACCESSORIES = 'accessories',
  SPORT = 'sport',
}

@Entity({ name: 'categories-product' })
export class CategoryProductEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'enum',
    enum: CategoryProduct,
    nullable: false,
  })
  @Index('idx_category_product_unique_name', { unique: true })
  name: CategoryProduct;

  @OneToMany(() => ProductEntity, (product) => product.id)
  product: ProductEntity[];
}
