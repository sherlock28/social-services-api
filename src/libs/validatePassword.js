import bcrypt from 'bcryptjs';
import logger from "../config/logger.js";

export const validatePassword = async (passwordFromRequest, passwordFromDB) => {
    try {
        return await bcrypt.compare(passwordFromRequest, passwordFromDB);
    } catch (err) {
        logger.error(`Couldn't validate password. Error: ${err}`);
        return false;
    }
};
