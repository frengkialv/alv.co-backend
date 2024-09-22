import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init31727021209759 implements MigrationInterface {
  name = 'Init31727021209759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brands" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_brand_unique_name" ON "brands" ("name") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."stocks_color_enum" AS ENUM('black', 'white', 'orange', 'green', 'blue', 'red', 'yellow', 'gray', 'purple', 'pink', 'lightBlue')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."stocks_size_enum" AS ENUM('small', 'medium', 'large', 'x-large', '40', '41', '42', '43', '44', 'one size')`,
    );
    await queryRunner.query(
      `CREATE TABLE "stocks" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "color" "public"."stocks_color_enum" NOT NULL, "size" "public"."stocks_size_enum" NOT NULL, "stock" integer NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_b5b1ee4ac914767229337974575" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."categories-product_name_enum" AS ENUM('t-shirts', 'shoes', 'accessories', 'sport')`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories-product" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."categories-product_name_enum" NOT NULL, CONSTRAINT "PK_2a41f964c1cd5de620c29b47c63" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_category_product_unique_name" ON "categories-product" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "product-solds" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer, "description-rating" character varying, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "product-id" uuid NOT NULL, "user-id" uuid NOT NULL, CONSTRAINT "PK_04fdddbfc23e1d9cadb6356077f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product-images" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imgSrc" character varying NOT NULL, "image-index" integer NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_d8a34eb9070e1dc64180c287deb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "discount_by_percent" integer, "material" character varying NOT NULL, "sold" integer NOT NULL, "category_product_id" uuid NOT NULL, "release_date" TIMESTAMP WITH TIME ZONE NOT NULL, "brand_id" uuid NOT NULL, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."cart_color_enum" AS ENUM('black', 'white', 'orange', 'green', 'blue', 'red', 'yellow', 'gray', 'purple', 'pink', 'lightBlue')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."carts_size_enum" AS ENUM('small', 'medium', 'large', 'x-large', '40', '41', '42', '43', '44', 'one size')`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "color" "public"."cart_color_enum" NOT NULL, "size" "public"."carts_size_enum" NOT NULL, "user_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(20) NOT NULL, "name" character varying NOT NULL, "address" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_user_unique_username" ON "users" ("username") `,
    );
    await queryRunner.query(
      `ALTER TABLE "stocks" ADD CONSTRAINT "FK_cdcdc9a4b531cbd24c06bc4f9e7" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product-solds" ADD CONSTRAINT "FK_0218a1a7a40e83a9652d7b0d835" FOREIGN KEY ("product-id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product-solds" ADD CONSTRAINT "FK_2d5309055c961f7318870d64d35" FOREIGN KEY ("user-id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product-images" ADD CONSTRAINT "FK_02968dcaadae5b616a1fb046504" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_8bc367fb7d5de5f3446b0ff708d" FOREIGN KEY ("category_product_id") REFERENCES "categories-product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_7d0e145ebd287c1565f15114a18" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "carts" DROP CONSTRAINT "FK_7d0e145ebd287c1565f15114a18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts" DROP CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_8bc367fb7d5de5f3446b0ff708d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product-images" DROP CONSTRAINT "FK_02968dcaadae5b616a1fb046504"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product-solds" DROP CONSTRAINT "FK_2d5309055c961f7318870d64d35"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product-solds" DROP CONSTRAINT "FK_0218a1a7a40e83a9652d7b0d835"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stocks" DROP CONSTRAINT "FK_cdcdc9a4b531cbd24c06bc4f9e7"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_user_unique_username"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TYPE "public"."carts_size_enum"`);
    await queryRunner.query(`DROP TYPE "public"."cart_color_enum"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "product-images"`);
    await queryRunner.query(`DROP TABLE "product-solds"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_category_product_unique_name"`,
    );
    await queryRunner.query(`DROP TABLE "categories-product"`);
    await queryRunner.query(
      `DROP TYPE "public"."categories-product_name_enum"`,
    );
    await queryRunner.query(`DROP TABLE "stocks"`);
    await queryRunner.query(`DROP TYPE "public"."stocks_size_enum"`);
    await queryRunner.query(`DROP TYPE "public"."stocks_color_enum"`);
    await queryRunner.query(`DROP INDEX "public"."idx_brand_unique_name"`);
    await queryRunner.query(`DROP TABLE "brands"`);
  }
}
