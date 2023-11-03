import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const generateToken = (id: number) => {  
    return jwt.sign( id.toString() , JWT_SECRET || '');
}

export const decodeToken = (token: string):number => {
    return parseInt(jwt.decode(token) as string);
}
