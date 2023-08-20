import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

const validateCreate = [
    check('number')
        .exists().withMessage("number is required")
        .notEmpty().withMessage("number cannot be empty")
        .isNumeric().withMessage("number must be numeric"),

    check('name')
        .exists().withMessage("name is required")
        .notEmpty().withMessage("name cannot be empty")
        .isAlphanumeric().withMessage("name must be alphabetical"),

    check('phone_one')
        .exists().withMessage("phone_one is required")
        .notEmpty().withMessage("phone_one cannot be empty"),

    check('phone_two')
        .optional()
        .notEmpty().withMessage("phone_two cannot be empty"),

    check('address')
        .exists().withMessage("address is required")
        .notEmpty().withMessage("address cannot be empty"),

    check('district')
        .exists().withMessage("district is required")
        .notEmpty().withMessage("district cannot be empty"),

    check('payday')
        .exists().withMessage("district is required")
        .notEmpty().withMessage("payday cannot be empty")
        .isNumeric().withMessage("payday must be numeric"),

    check('last_pay_amount')
        .exists().withMessage("last_pay_amount is required")
        .notEmpty().withMessage("last_pay_amount cannot be empty")
        .isNumeric().withMessage("last_pay_amount must be numeric")
        .custom((value, { req }) => custom_last_pay_amount_validation(value, req)),

    check('plan_id')
        .exists().withMessage("plan_id is required")
        .notEmpty().withMessage("plan_id cannot be empty")
        .isNumeric().withMessage("plan_id must be numeric"),

    (req, res, next) => validateResult(req, res, next)
];

const custom_last_pay_amount_validation = (value, req) => {
    if (value <= 0) {
        throw new Error("last_pay_amount cannot be less than or equal to zero");
    }

    return true;
};

export { validateCreate };