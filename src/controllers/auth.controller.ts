import {NextFunction} from "express";
import {validationResult} from "express-validator";
import {sendResponse} from "../utils/sendResponse";
import { loginAdminService } from "../sevices/auth/auth.admin.service";
import { loginStaffService, registerStaffService } from "../sevices/auth/auth.staff.service";

export const loginAdmin = (req:any, res:any) => {
    const { email, password } = req.body;
    return loginAdminService(res, email, password)
}
export const loginStaff = (req:any, res:any) => {
    const { email, password } = req.body;
    return loginStaffService(res, email, password)
}

export const registerStaff = (req:any, res:any) => {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (errors.isEmpty()) {
        return registerStaffService(res, req.body)
    }
    return sendResponse(res, false, errors.array(), 'failed to create staff', 422);
}