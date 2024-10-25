import { CommonEntity } from 'src/common/entity/common.entity';
import { ProductEntity } from 'src/modules/product/entity/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product-images' })
export class ProductImageEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'imgSrc',
    type: 'text',
    nullable: false,
  })
  imgSrc: string;

  @Column({
    name: 'image-index',
    type: 'integer',
    nullable: false,
  })
  imageIndex: number;

  @Column({
    name: 'product_id',
    type: 'uuid',
    nullable: false,
  })
  productId: string;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product: ProductEntity;
}
