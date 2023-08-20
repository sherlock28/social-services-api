import { HttpStatusCode } from '../const/statusCodes.js';
import { serviceResponse } from "../libs/serviceResponse.js";
import { PrismaClient } from "@prisma/client";
import logger from "../config/logger.js";

const prisma = new PrismaClient();

class MemberController {

	async create(req, res) {

		const { number, name, phone_one, phone_two, address, district, payday, last_pay_amount, plan_id, payments } = req.body;

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
					payments,
					plan: {
						connect: { id: plan_id }
					}
				}
			});

			return res.status(HttpStatusCode.OK).json(serviceResponse({ data: newMember, success: true, message: "Member created successfully", error: null }));

		} catch (err) {
			logger.error("Couldn't save member", err);
			return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: true, message: "Couldn't save member", error: err }));
		}
	}

	update(req, res) {

		return res.status(HttpStatusCode.OK).json(serviceResponse({ data: true, success: true, message: "Member updated successfully", error: null }));
	}

	delete(req, res) {

		return res.status(HttpStatusCode.OK).json(serviceResponse({ data: true, success: true, message: "Member deleted successfully", error: null }));
	}

	getByNumber(req, res) {

		return res.status(HttpStatusCode.OK).json(serviceResponse({ data: true, success: true, message: "Successfully obtained member", error: null }));
	}

	get(req, res) {

		return res.status(HttpStatusCode.OK).json(serviceResponse({ data: true, success: true, message: "Successfully obtained members", error: null }));
	}
}

export const memberCtrl = new MemberController();
