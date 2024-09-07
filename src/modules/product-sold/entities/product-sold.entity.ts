import { CommonEntity } from 'src/common/entity/common.entity';
import { ProductRatingEntity } from 'src/modules/product-rating/entities/product-rating.entity';
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

  @Column({
    name: 'rating-id',
    type: 'uuid',
    nullable: false,
  })
  ratingId: string;

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

  @OneToOne(
    () => ProductRatingEntity,
    (productRating) => productRating.productSold,
  )
  @JoinColumn({
    name: 'rating-id',
    referencedColumnName: 'id',
  })
  productRating: ProductRatingEntity;

  @BeforeInsert()
  updateDate() {
    this.date = new Date();
  }
}
