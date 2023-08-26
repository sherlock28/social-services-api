import { HttpStatusCode } from '../const/statusCodes.js';
import { serviceResponse } from "../libs/serviceResponse.js";
import { PrismaClient } from "@prisma/client";
import logger from "../config/logger.js";

const prisma = new PrismaClient();
import { encryptPassword } from '../libs/encryptPassword.js';

class UserController {

    async create(req, res) {

        const { name, email, username, password } = req.body;

        try {

            const encryptedPassword = await encryptPassword(password);

            const newUser = await prisma.User.create({
                data: {
                    name,
                    email,
                    username,
                    password: encryptedPassword
                }
            });

            return res.status(HttpStatusCode.OK).json(serviceResponse({ data: newUser, success: true, message: "User created successfully", error: null }));
        } catch (err) {
            logger.error("Couldn't create user", err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: false, message: "Couldn't create user", error: err }));
        }
    }

    async update(req, res) {

        const { id } = req.params;

        return res.status(HttpStatusCode.OK).json(serviceResponse({ data: true, success: true, message: "User updated successfully", error: null }));
    }

    async delete(req, res) {

        try {
            const { id } = req.params;

            const user = await prisma.User.findFirst({ where: { id: +id } });

            if (!user)
                return res.status(HttpStatusCode.NOT_FOUND).json(serviceResponse({ data: null, success: true, message: "User not found", error: null }));

            const deletedUser = await prisma.User.delete({ where: { id: +id } });

            return res.status(HttpStatusCode.OK).json(serviceResponse({ data: { id: deletedUser.id }, success: true, message: "User deleted successfully", error: null }));
        } catch (err) {
            logger.error("Couldn't delete user", err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: false, message: "Couldn't delete user", error: err }));
        }
    }

    async getById(req, res) {

        const { id } = req.params;

        try {
            const user = await prisma.User.findFirst({
                select: {
                    name: true,
                    email: true,
                    username: true,
                },
                where: { id: +id }
            });

            if (!user)
                return res.status(HttpStatusCode.NOT_FOUND).json(serviceResponse({ data: null, success: true, message: "User not found", error: null }));

            return res.status(HttpStatusCode.OK).json(serviceResponse({ data: user, success: true, message: "Successfully obtained user", error: null }));

        } catch (err) {
            logger.error("Couldn't get user", err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: false, message: "Couldn't get user", error: err }));
        }
    }

    async get(req, res) {

        const offset = req.query.offset ?? 0;
        const limit = req.query.limit ?? 20;

        try {
            const users = await prisma.User.findMany({
                select: { 
                    name: true,
                    email: true,
                    username: true, 
                },
                orderBy: { created_at: "desc" },
                skip: +offset,
                take: +limit
            });

            return res.status(HttpStatusCode.OK).json(serviceResponse({ data: users, success: true, message: "Successfully obtained users", error: null }));
        } catch (err) {
            logger.error("Couldn't get users", err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: false, message: "Couldn't get users", error: err }));
        }
    }
}

export const userCtrl = new UserController();
