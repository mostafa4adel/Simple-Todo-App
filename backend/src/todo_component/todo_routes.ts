import express from 'express';
import { createTodo, getAllTodo, deleteTodo, updateTodo } from './todo_handler';
import { validate_todo, validate_token } from './todo_middleware';


const todoRouter = express.Router();

// Create a new todo
todoRouter.post('/', validate_token,validate_todo, createTodo);

// Get all todo
todoRouter.get('/', validate_token, getAllTodo);

// Delete a todo by ID
todoRouter.delete('/', validate_token, deleteTodo);

// Update a todo by ID
todoRouter.put('/', validate_token, updateTodo);

export default todoRouter;