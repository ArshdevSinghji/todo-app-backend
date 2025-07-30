import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { User } from './user/entities/user.entity';
import { Task } from './task/entities/task.entity';
import { AssignedTask } from './assigned-task/entities/assigned-task.entity';

dotenvConfig({ path: '.env' });

export const dataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Task, AssignedTask, 'dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  seeds: ['dist/database/seeds/*.js'],
  synchronize: false,
  logging: false,
} as DataSourceOptions;

export const dataSource = new DataSource(dataSourceOptions);
