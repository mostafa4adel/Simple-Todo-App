import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import {decodeToken} from '../utils/jwt_utils';

const todo_schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(30).required(),
    date: Joi.date().required(),
    isDone: Joi.boolean().required(),
});


export const validate_todo = (req: Request, res: Response, next: NextFunction) => {
    const { error } = todo_schema.validate({title:req.body.title, description:req.body.description,date:req.body.date,isDone:req.body.isDone});
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

export const validate_token = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = decodeToken(token as string);
    if (decoded == null) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    req.body.userid = decoded;
    next();
}