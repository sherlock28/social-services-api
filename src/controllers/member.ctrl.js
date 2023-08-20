import { HttpStatusCode } from '../const/statusCodes.js';
import { serviceResponse } from "../libs/serviceResponse.js";

class MemberController {

	create(req, res) {

        return res.status(HttpStatusCode.OK).json(serviceResponse({ data: true, success: true, message: "Member created successfully", error: null }));
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
