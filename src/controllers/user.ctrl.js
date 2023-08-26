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

        const { id } = req.params;

        return res.status(HttpStatusCode.OK).json(serviceResponse({ data: { id: id }, success: true, message: "User deleted successfully", error: null }));
    }

    async getById(req, res) {

        const { id } = req.params;

        return res.status(HttpStatusCode.OK).json(serviceResponse({ data: true, success: true, message: "Successfully obtained user", error: null }));
    }

    async get(req, res) {

        const offset = req.query.offset ?? 0;
        const limit = req.query.limit ?? 20;

        return res.status(HttpStatusCode.OK).json(serviceResponse({ data: [], success: true, message: "Successfully obtained users", error: null }));
    }
}

export const userCtrl = new UserController();
