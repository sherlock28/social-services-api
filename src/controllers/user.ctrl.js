import { HttpStatusCode } from '../const/statusCodes.js';
import { libs } from "../libs/index.js";
import { PrismaClient } from "@prisma/client";
import logger from "../config/logger.js";

const prisma = new PrismaClient();

class UserController {

    async create(req, res) {

        const { name, email, username, password } = req.body;

        try {

            const encryptedPassword = await libs.encryptPassword(password);

            const newUser = await prisma.User.create({
                data: {
                    name,
                    email,
                    username,
                    password: encryptedPassword
                }
            });

            return res.status(HttpStatusCode.OK).json(libs.serviceResponse({ data: newUser, success: true, message: "User created successfully", error: null }));
        } catch (err) {
            logger.error("Couldn't create user", err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(libs.serviceResponse({ data: null, success: false, message: "Couldn't create user", error: err }));
        }
    }

    async changePassword(req, res) {

        try {
            const { id } = req.params;
            const { currentPassword, newPassword } = req.body;

            const user = await prisma.User.findFirst({ where: { id: +id } });

            if (!user)
                return res.status(HttpStatusCode.NOT_FOUND).json(libs.serviceResponse({ data: null, success: true, message: "Current password is invalid", error: null }));

            const isCorrectPass = await libs.validatePassword(currentPassword, user.password);

            if (!isCorrectPass)
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(libs.serviceResponse({ data: null, success: false, message: "Couldn't change user password", error: err }));

            const encryptedPassword = await libs.encryptPassword(newPassword);

            const userUpdated = await prisma.User.update({
                where: { id: +id },
                data: {
                    password: encryptedPassword
                }
            });

            return res.status(HttpStatusCode.OK).json(libs.serviceResponse({ data: { id: userUpdated.id }, success: true, message: "User password successfully changed", error: null }));
        } catch (err) {
            logger.error("Couldn't change user password", err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(libs.serviceResponse({ data: null, success: false, message: "Couldn't change user password", error: err }));
        }
    }

    async delete(req, res) {

        try {
            const { id } = req.params;

            const user = await prisma.User.findFirst({ where: { id: +id } });

            if (!user)
                return res.status(HttpStatusCode.NOT_FOUND).json(libs.serviceResponse({ data: null, success: true, message: "User not found", error: null }));

            const deletedUser = await prisma.User.delete({ where: { id: +id } });

            return res.status(HttpStatusCode.OK).json(libs.serviceResponse({ data: { id: deletedUser.id }, success: true, message: "User deleted successfully", error: null }));
        } catch (err) {
            logger.error("Couldn't delete user", err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(libs.serviceResponse({ data: null, success: false, message: "Couldn't delete user", error: err }));
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
                return res.status(HttpStatusCode.NOT_FOUND).json(libs.serviceResponse({ data: null, success: true, message: "User not found", error: null }));

            return res.status(HttpStatusCode.OK).json(libs.serviceResponse({ data: user, success: true, message: "Successfully obtained user", error: null }));

        } catch (err) {
            logger.error("Couldn't get user", err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(libs.serviceResponse({ data: null, success: false, message: "Couldn't get user", error: err }));
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

            return res.status(HttpStatusCode.OK).json(libs.serviceResponse({ data: users, success: true, message: "Successfully obtained users", error: null }));
        } catch (err) {
            logger.error("Couldn't get users", err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(libs.serviceResponse({ data: null, success: false, message: "Couldn't get users", error: err }));
        }
    }
}

export const userCtrl = new UserController();
