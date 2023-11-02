import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const generateToken = (payload: string) => {  
    return jwt.sign(payload, JWT_SECRET || '');
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET || '');
}

export const decodeToken = (token: string) => {
    return jwt.decode(token);
}
