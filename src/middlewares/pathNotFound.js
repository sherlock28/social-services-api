import { serviceResponse } from '../libs/serviceResponse.js';
import { HttpStatusCode } from '../const/statusCodes.js';

const pathNotFound = (req, res) => {

  return res.status(HttpStatusCode.NOT_FOUND).json(serviceResponse({ data: null, success: false, message: "Path not found", error: null }));
}

export { pathNotFound };
