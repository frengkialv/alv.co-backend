import { CommonEntity } from 'src/common/entity/common.entity';
import { ProductEntity } from 'src/modules/product/entity/product.entity';
import { Color, Size } from 'src/modules/stock/entities/stock.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'carts' })
export class CartEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'quantity',
    type: 'integer',
    nullable: false,
  })
  quantity: number;

  @Column({
    name: 'color',
    type: 'enum',
    enumName: 'cart_color_enum',
    enum: Color,
    nullable: false,
  })
  color: Color;

  @Column({
    name: 'size',
    type: 'enum',
    enumName: 'cart_size_enum',
    enum: Size,
    nullable: false,
  })
  size: Size;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId: string;

  @Column({
    name: 'product_id',
    type: 'uuid',
  })
  productId: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product: ProductEntity;
}
