import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(__dirname, '../.env')});

export const JWT_SECRET = process.env.JWT_SECRET ;
export const NODE_PORT = process.env.NODE_PORT ;
export const MONGO_URI = process.env.MONGO_URI ;
