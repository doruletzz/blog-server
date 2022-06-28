import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.MYSQL_URL);

export const USER = process.env.MYSQL_USER;
export const IS_PROD = process.env.NODE_ENV !== 'production';
export const PORT = process.env.MYSQL_PORT ;
export const DB_NAME = process.env.MYSQL_DB;
export const URL = process.env.MYSQL_HOST;
export const PASS = process.env.MYSQL_PASS;