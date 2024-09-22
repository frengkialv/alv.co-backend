import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'alv.co',
  entities: ['dist/src/modules/**/*.entity.js'], // Path to entity
  migrations: ['dist/db/migrations/*.js'], // Path to migration
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
