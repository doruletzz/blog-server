import dotenv from 'dotenv';
dotenv.config();

export const USER = process.env.MYSQL_USER;
export const IS_PROD = process.env.NODE_ENV !== 'production';
export const PORT = process.env.PORT ;
export const PASS = process.env.MYSQL_PASS;