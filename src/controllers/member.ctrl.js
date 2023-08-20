import { HttpStatusCode } from '../const/statusCodes.js';
import { serviceResponse } from "../libs/serviceResponse.js";

class MemberController {

	create(req, res) {

        return res.status(HttpStatusCode.OK).json(serviceResponse({ data: true, success: true, message: "Member created successfully", error: null }));
	}
}

export const memberCtrl = new MemberController();
