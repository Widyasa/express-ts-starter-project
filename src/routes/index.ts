import express from "express";
import {authRoute} from "./auth.route";
import {StaffRoute} from "./staff.route";

export const router = express.Router()
router.use('/auth', authRoute)
router.use('/staff', StaffRoute)

