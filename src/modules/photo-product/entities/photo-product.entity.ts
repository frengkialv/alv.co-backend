import { CommonEntity } from 'src/common/entity/common.entity';
import { ProductEntity } from 'src/modules/product/entity/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'photos-product' })
export class PhotoProductEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'imgSrc',
    type: 'varchar',

    nullable: false,
  })
  imgSrc: string;

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
