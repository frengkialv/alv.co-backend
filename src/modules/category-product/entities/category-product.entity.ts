import { CommonEntity } from 'src/common/entity/common.entity';
import { ProductEntity } from 'src/modules/product/entity/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum NameProduct {
  'T_SHIRT' = 't-shirt',
  SHOES = 'shoes',
  ACCESSORIED = 'accessories',
  SPORT = 'sport',
}

@Entity({ name: 'categories-product' })
export class CategoryProductEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'enum',
    enum: NameProduct,
  })
  name: NameProduct;

  @OneToMany(() => ProductEntity, (product) => product.id)
  product: ProductEntity[];
}
