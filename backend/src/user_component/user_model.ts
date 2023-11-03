import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class User_Model {

    private static instance: User_Model;

    private constructor() {}

    public static getInstance(): User_Model {
        if (!User_Model.instance) {
            User_Model.instance = new User_Model();
        }

        return User_Model.instance;
    }

    create_user = async (username: string, password: string) => {
        const hashed_password = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashed_password
            }
        });
        return user;
    }

    check_username = async (username: string) => {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });
        return user;
    }

    delete_user = async (id: number, username:string) => {
        const user = prisma.user.findUnique({
            where: {
                id: id,
                username: username
            }
        });
        if (!user) {
            return null;
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        });
        return user;
    }

    get_user = async (id: number) => {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        return user;
    }

    edit_username = async (id: number, username: string) => {
        
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                username: username
            }
        });
        return user;
    }

    login_user = async (username: string, password: string) => {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

}