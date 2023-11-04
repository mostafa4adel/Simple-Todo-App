import { Request, Response } from 'express';
import { TODO_Model } from './todo_model';

const todo_model = TODO_Model.getInstance();

export const createTodo = async (req: Request, res: Response) => {
    
    try {
        const todo = await todo_model.create_todo(req.body.title, req.body.description, req.body.date, req.body.isDone, req.body.userid);
        return res.status(201).json({ message: 'Todo created', data: todo });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export const getAllTodo = async (req: Request, res: Response) => {
    try{
        const todo = await todo_model.get_all_todo(req.body.userid);
        return res.status(200).json({ message: 'Todo fetched', data: todo });
    }
    catch(error){
        return res.status(500).json({ message:'Server Error' });
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    try{
        const todo = await todo_model.delete_todo(parseInt(req.body.id),req.body.userid);
        if (todo == null) {
            return res.status(400).json({ message: 'Todo not found' });
        }
        return res.status(200).json({ message: 'Todo deleted' });

    }
    catch(error){
        return res.status(500).json({ message:'Server Error' });
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    try{

        const todo = await todo_model.update_todo(parseInt(req.body.id),req.body.userid,req.body.title,req.body.description,req.body.date);

        if (todo == null) {
            return res.status(400).json({ message: 'Todo not found' });
        }
        return res.status(200).json({ message: 'Todo updated' });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message:'Server Error' });
    }
}

export const toggleTodo = async (req: Request, res: Response) => {
    try{
        const todo = await todo_model.toggle_todo_status(parseInt(req.params.id),req.body.userid);
        if (todo == null) {
            return res.status(400).json({ message: 'Todo not found' });
        }
        return res.status(200).json({ message: 'Todo updated' });

    }
    catch(error){
        return res.status(500).json({ message:'Server Error' });
    }
}

