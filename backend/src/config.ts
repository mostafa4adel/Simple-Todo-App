import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(__dirname, '../.env')});

export const JWT_SECRET: string | undefined = process.env.JWT_SECRET ;
export const NODE_PORT: number =  parseInt( process.env.NODE_PORT || '3000' ) ;
export const MONGO_URI: string | undefined = process.env.MONGO_URI ;
