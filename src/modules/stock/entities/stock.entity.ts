import { CommonEntity } from 'src/common/entity/common.entity';
import { ProductEntity } from 'src/modules/product/entity/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Color {
  BLACK = 'black',
  WHITE = 'white',
  ORANGE = 'orange',
  GREEN = 'green',
  BLUE = 'blue',
  RED = 'red',
  YELLOW = 'yellow',
  GRAY = 'gray',
  PURPLE = 'purple',
  PINK = 'pink',
  'LIGHT-BLUE' = 'lightBlue',
}

export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  'X-LARGE' = 'x-large',
  'FOURTY' = '40',
  'FOURTY_ONE' = '41',
  'FOURTY_TWO' = '42',
  'FOURTY_THREE' = '43',
  'FOURTY_FOUR' = '44',
  'ONE_SIZE' = 'one size',
}

@Entity({ name: 'stocks' })
export class StockEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'color',
    type: 'enum',
    enum: Color,
    nullable: false,
  })
  color: Color;

  @Column({
    name: 'size',
    type: 'enum',
    enum: Size,
    nullable: false,
  })
  size: Size;

  @Column({
    name: 'stock',
    type: 'integer',
    nullable: false,
  })
  stock: number;

  @Column({
    name: 'product_id',
    type: 'uuid',
  })
  productId: string;

  @ManyToOne(() => ProductEntity, (product) => product.stock)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product: ProductEntity;
}
