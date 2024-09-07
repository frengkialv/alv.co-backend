import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { CommonEntity } from 'src/common/entity/common.entity';
import { ProductEntity } from 'src/modules/product/entity/product.entity';

@Entity({ name: 'brands' })
export class BrandEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  @Index('idx_brand_unique_name', { unique: true })
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.id)
  product: ProductEntity[];
}
