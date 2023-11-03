import { Request, Response } from 'express';
import { User_Model } from './user_model';
import { generateToken } from '../utils/jwt_utils';

const user_model = User_Model.getInstance();
// User registration handler
export const registerUser = async (req: Request, res: Response) => {

    try {
        if (await user_model.check_username(req.body.username)) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = await user_model.create_user(req.body.username, req.body.password);

        const token = generateToken( user.id  );
        return res.status(201).json({ message: 'User created' ,token: token });
    }
    catch (error) {
        return res.status(500).json({ message:'Server Error' });
    }
};

// User login handler
export const loginUser = async (req: Request, res: Response) => {
    try{
        const user = await user_model.login_user(req.body.username, req.body.password);
        if (user == null) {
            return res.status(400).json({ message: 'User not found' });
        }
        const token = generateToken( user.id );
        return res.status(200).json({ message: 'User logged in', token: token });
    }   
    catch(error){
        return res.status(500).json({ message:'Server Error' });

    }
};

// User deletion handler
export const deleteUser = async (req: Request, res: Response) => {
    try {
        
        const user = await user_model.delete_user(parseInt(req.body.userid) , req.body.username);
        if (user == null) {
            return res.status(400).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted' });
    }
    catch (error) {
        return res.status(500).json({ message:'Server Error' });
    }
};


export const editUsername = async (req: Request, res: Response) => {
    try {
        if (await user_model.check_username(req.body.username)) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        const user = await user_model.edit_username(parseInt(req.body.userid), req.body.username);
        return res.status(200).json({ message: 'Username updated' });
    }
    catch (error) {
        return res.status(500).json({ message:'Server Error' });
    }
}
