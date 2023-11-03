import { Router } from "express";
import userRouter from './user_component/user_routes';
import todoRouter from './todo_component/todo_routes';

const router = Router();

router.use('/user', userRouter);
router.use('/todo', todoRouter);

export default router;