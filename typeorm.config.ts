import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['src/database/migrations/*{.ts,.js}'],
  entities: ['src/**/*.entity{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
  seeds: ['src/database/seeders/*{.ts,.js}'],
  seedTracking: false,
} as DataSourceOptions & SeederOptions);
