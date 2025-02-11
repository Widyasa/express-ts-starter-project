import express from "express";
import {registerRequest} from "../requests/register.request";
import {loginAdmin, loginStaff, registerStaff} from "../controllers/auth.controller";

export const authRoute = express.Router()


authRoute.post('/staff/register', registerRequest, registerStaff)
authRoute.post('/staff/login', loginStaff)
authRoute.post('/admin/login', loginAdmin)
