import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import {decodeToken} from '../utils/jwt_utils';

const user_schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const username_schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
});

export const validate_user = (req: Request, res: Response, next: NextFunction) => {
    const { error } = user_schema.validate({username:req.body.username, password:req.body.password});
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export const validate_token = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = decodeToken(token as string);
    const error  = username_schema.validate({username:req.body.username});
    console.log(error);
    console.log(decoded);
    if (decoded == null || error.error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    req.body.userid = decoded;
    next();
}