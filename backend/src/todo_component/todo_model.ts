import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TODO_Model {

    private static instance: TODO_Model;

    private constructor() {}

    public static getInstance(): TODO_Model {
        if (!TODO_Model.instance) {
            TODO_Model.instance = new TODO_Model();
        }

        return TODO_Model.instance;
    }

    create_todo = async (title: string, description: string, date:Date, isDone:boolean ,userid: number) => {
        const todo = await prisma.todo.create({
            data: {
                title: title,
                description: description,
                date: date,
                isDone: isDone,
                userId: userid
            }
        });
        return todo;
    }

    get_all_todo = async (userid: number) => {
        const todo = await prisma.todo.findMany({
            where: {
                userId: userid
            }
        });
        return todo;
    }

    delete_todo = async (id: number,userid:number) => {
        const todo = prisma.todo.findUnique({
            where: {
                id: id,
                userId: userid
            }
        });
        if (!todo) {
            return null;
        }

        await prisma.todo.delete({
            where: {
                id: id
            }
        });
        return todo;
    }

    update_todo = async (id: number,userid:number,title:string,description:string,date:Date) => {
        const todo = prisma.todo.findUnique({
            where: {
                id: id,
                userId: userid
            }
        });
        if (!todo) {
            return null;
        }
        await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                title: title,
                description: description,
                date: date
            }
        });
        return todo;
    }
}