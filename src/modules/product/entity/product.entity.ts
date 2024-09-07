import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { CommonEntity } from 'src/common/entity/common.entity';
import { BrandEntity } from 'src/modules/brand/entity/brand.entity';
import { StockEntity } from 'src/modules/stock/entities/stock.entity';
import { CategoryProductEntity } from 'src/modules/category-product/entities/category-product.entity';

@Entity({ name: 'products' })
export class ProductEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'price',
    type: 'integer',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'discount_by_percent',
    type: 'integer',
    nullable: true,
  })
  discountByPercent: number | null;

  @Column({
    name: 'material',
    type: 'varchar',
    nullable: false,
  })
  material: string;

  @Column({
    name: 'sold',
    type: 'integer',
    nullable: false,
  })
  sold: number;

  @Column({
    name: 'category_product_id',
    type: 'uuid',
    nullable: false,
  })
  categoryProductId: string;

  @Column({
    name: 'release_date',
    type: 'date',
    nullable: false,
  })
  releaseDate: Date;

  @Column({
    name: 'brand_id',
    type: 'uuid',
  })
  brandId: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.id)
  @JoinColumn({
    name: 'brand_id',
    referencedColumnName: 'id',
  })
  brand: BrandEntity;

  @OneToMany(() => StockEntity, (stock) => stock.product)
  stock: StockEntity[];

  @ManyToOne(
    () => CategoryProductEntity,
    (categoryProduct) => categoryProduct.id,
  )
  @JoinColumn({
    name: 'category_product_id',
    referencedColumnName: 'id',
  })
  categoryProduct: CategoryProductEntity;

  @BeforeInsert()
  updateDates() {
    this.sold = 0;
  }
}
