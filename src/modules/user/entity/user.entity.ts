import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { CommonEntity } from 'src/common/entity/common.entity';
import { IsEmail } from 'class-validator';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { ProductSoldEntity } from 'src/modules/product-sold/entities/product-sold.entity';

@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 20,
  })
  @Index('idx_user_unique_username', { unique: true })
  username: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'address',
    type: 'varchar',
    nullable: true,
  })
  address: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  @IsEmail()
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @OneToMany(() => CartEntity, (cart) => cart.user)
  cart: CartEntity[];

  @OneToMany(() => ProductSoldEntity, (productSold) => productSold.user)
  productSold: ProductSoldEntity[];
}
