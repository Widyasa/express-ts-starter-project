import {body} from "express-validator";

export const loginRequest = [
    body('email', 'invalid email').isEmail(),
    body('email', 'email required').notEmpty(),
    body('password', 'password is required').notEmpty(),
]