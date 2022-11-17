import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();
export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'wallet',
  entities: ['dist/**/*.entity.{js,ts}'],
  synchronize: false,
  logging: false,
  dropSchema: false,
  migrationsRun: false,
};

export default new DataSource({
  ...databaseConfig,
  migrationsRun: true,
  migrations: ['src/migrations/*.{js,ts}'],
});
