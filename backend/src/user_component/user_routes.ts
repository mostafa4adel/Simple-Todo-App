import express from 'express';
import { registerUser,   deleteUser, loginUser, editUsername} from './user_handler';
import { validate_user,validate_token } from './user_middleware';


const userRouter = express.Router();

// Create a new user
userRouter.post('/', validate_user, registerUser);

// login a user
userRouter.post('/login', validate_user,loginUser);

// Delete a user by ID
userRouter.delete('/',validate_token ,deleteUser);

// Update a username by ID
userRouter.put('/',validate_token, editUsername);

export default userRouter;
