import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: ['dist/src/modules/**/*.entity.js'], // Path to entity
  migrations: ['dist/db/migrations/*.js'], // Path to migration
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
