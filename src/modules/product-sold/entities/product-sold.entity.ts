import { CommonEntity } from 'src/common/entity/common.entity';
import { ProductEntity } from 'src/modules/product/entity/product.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product-solds' })
export class ProductSoldEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'rating',
    type: 'integer',
    nullable: true,
  })
  rating: number | null;

  @Column({
    name: 'description-rating',
    type: 'varchar',
    nullable: true,
  })
  descriptionRating: string;

  @Column({
    name: 'date',
    type: 'timestamptz',
    nullable: false,
  })
  date: Date;

  @Column({
    name: 'product-id',
    type: 'uuid',
    nullable: false,
  })
  productId: string;

  @Column({
    name: 'user-id',
    type: 'uuid',
    nullable: false,
  })
  userId: string;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: 'product-id',
    referencedColumnName: 'id',
  })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'user-id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @BeforeInsert()
  updateDate() {
    this.date = new Date();
  }
}
