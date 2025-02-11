import express from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {adminMiddleware} from "../middleware/admin.middleware";
import {
    destroyStaff,
    getAllStaff,
    getStaffById,
    storeImage,
    storeStaff,
    updateStaff
} from "../controllers/staff.controller";
import {staffRequest} from "../requests/staff.request";
import {uploadFile} from "../utils/uploadImage";


export const StaffRoute = express.Router();
StaffRoute.get('/', authMiddleware, adminMiddleware, getAllStaff)
StaffRoute.get('/:id', authMiddleware, adminMiddleware, getStaffById)
StaffRoute.post('/', authMiddleware, adminMiddleware, staffRequest, storeStaff)
StaffRoute.patch('/:id', authMiddleware, adminMiddleware, staffRequest, updateStaff)
StaffRoute.delete('/:id', authMiddleware, adminMiddleware, destroyStaff)
StaffRoute.post('/upload/:id', authMiddleware, adminMiddleware, (req, res, next) => {
    const id = req.params.id;
    return uploadFile(id, 'public/upload/staff').single('image')(req, res, next);
}, storeImage);