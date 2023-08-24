import { check, param } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

const validateCreate = [

    check('name')
        .exists().withMessage("name is required")
        .notEmpty().withMessage("name cannot be empty")
        .isAlpha('es-ES', { ignore: '\s' }).withMessage("name must contain only letters"),

    check('email')
        .exists().withMessage("email is required")
        .notEmpty().withMessage("email cannot be empty")
        .isEmail().withMessage("email is invalid"),

    check('username')
        .exists().withMessage("username is required")
        .notEmpty().withMessage("username cannot be empty")
        .isLength({ min: 4 }).withMessage("username must be at least 4 characters long"),

    check('password')
        .exists().withMessage("password is required")
        .notEmpty().withMessage("password cannot be empty")
        .isLength({ min: 6 }).withMessage("invalid password. password must be at least 6 characters long")
        .isAlphanumeric().withMessage("password must be alphanumeric"),

    (req, res, next) => validateResult(req, res, next)
];

const validateUpdate = [

    check('username')
        .exists().withMessage("username is required")
        .notEmpty().withMessage("username cannot be empty")
        .isLength({ min: 4 }).withMessage("username must be at least 4 characters long"),

    check('password')
        .exists().withMessage("password is required")
        .notEmpty().withMessage("password cannot be empty")
        .isLength({ min: 6 }).withMessage("invalid password. password must be at least 6 characters long")
        .isAlphanumeric().withMessage("password must be alphanumeric"),

    (req, res, next) => validateResult(req, res, next)
];

const validateId = [
    param('id')
        .exists().withMessage("id is required")
        .notEmpty().withMessage("id cannot be empty")
        .isNumeric().withMessage("id must be numeric"),

    (req, res, next) => validateResult(req, res, next)
];

export { validateCreate, validateUpdate, validateId };