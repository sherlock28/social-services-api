import { HttpStatusCode } from '../const/statusCodes.js';
import { serviceResponse } from "../libs/serviceResponse.js";
import { PrismaClient } from "@prisma/client";
import logger from "../config/logger.js";

const prisma = new PrismaClient();

class MemberController {

	async create(req, res) {

		const { number, name, phone_one, phone_two, address, district, payday, last_pay_amount, plan_id } = req.body;

		try {
			const newMember = await prisma.Member.create({
				data: {
					number,
					name,
					phone_one,
					phone_two: phone_two ?? null,
					address,
					district,
					payday,
					last_pay_amount,
					plan: {
						connect: { id: plan_id }
					}
				}
			});

			return res.status(HttpStatusCode.OK).json(serviceResponse({ data: newMember, success: true, message: "Member created successfully", error: null }));

		} catch (err) {
			logger.error("Couldn't save member", err);
			return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: false, message: "Couldn't save member", error: err }));
		}
	}

	async update(req, res) {

		const { number } = req.params;
		const { name, phone_one, phone_two, address, district, payday, last_pay_amount, plan_id } = req.body;

		try {
			const member = await prisma.Member.findFirst({ where: { number: +number } });

			if (!member)
				return res.status(HttpStatusCode.NOT_FOUND).json(serviceResponse({ data: null, success: true, message: "Member not found", error: null }));

			const memberUpdated = await prisma.Member.update({
				where: { number: +number },
				data: {
					name,
					phone_one,
					phone_two: phone_two ?? null,
					address,
					district,
					payday,
					last_pay_amount,
					plan: {
						connect: { id: plan_id }
					}
				}
			});

			return res.status(HttpStatusCode.OK).json(serviceResponse({ data: memberUpdated, success: true, message: "Member updated successfully", error: null }));
		} catch (err) {
			logger.error("Couldn't update member", err);
			return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: false, message: "Couldn't update member", error: err }));
		}
	}

	async delete(req, res) {

		const { number } = req.params;

		try {
			const deletedUser = await prisma.Member.delete({ where: { number: +number } });

			return res.status(HttpStatusCode.OK).json(serviceResponse({ data: { number: deletedUser.number }, success: true, message: "Member deleted successfully", error: null }));
		} catch (err) {
			logger.error("Couldn't delete member", err);
			return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: false, message: "Couldn't delete member", error: err }));
		}
	}

	async getByNumber(req, res) {

		const { number } = req.params;

		try {
			const member = await prisma.Member.findFirst({ where: { number: +number } });

			if (!member)
				return res.status(HttpStatusCode.NOT_FOUND).json(serviceResponse({ data: null, success: true, message: "Member not found", error: null }));

			return res.status(HttpStatusCode.OK).json(serviceResponse({ data: member, success: true, message: "Successfully obtained member", error: null }));

		} catch (err) {
			logger.error("Couldn't get member", err);
			return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: false, message: "Couldn't get member", error: err }));
		}
	}

	async get(req, res) {

		const offset = req.query.offset ?? 0;
		const limit = req.query.limit ?? 20;

		try {
			const members = await prisma.Member.findMany({
				where: { status: true },
				orderBy: { number: "asc" },
				skip: +offset,
				take: +limit
			});

			return res.status(HttpStatusCode.OK).json(serviceResponse({ data: members, success: true, message: "Successfully obtained members", error: null }));
		} catch (err) {
			logger.error("Couldn't get members", err);
			return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: false, message: "Couldn't get members", error: err }));
		}
	}
}

export const memberCtrl = new MemberController();
