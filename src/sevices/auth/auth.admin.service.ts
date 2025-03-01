import {prisma} from "../../utils/prisma";
import {sendResponse} from "../../utils/sendResponse";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import bcrypt from 'bcrypt'
dotenv.config()
const findAdminCredentials = async (email: string) => {
    const findUser = await prisma.admin.findUnique({where: {email}});
    if (!findUser) {
        return {success: false, message: 'user not found'}
    }
    return {success: true, user: findUser};
}
export const loginAdminService = async (res:any, email: string, password: string) => {
    const loginData = await findAdminCredentials(email)
    if (!loginData.success || !loginData.user) {
        return sendResponse(res, false, null, loginData.message || 'user not found', 403)
    }
    const passwordValidation = await bcrypt.compare(password,loginData.user.password )
    const expiredToken:number = 60 * 60 * 72
    if (passwordValidation) {
        const token = jwt.sign({
            data: {
                id: loginData.user.id,
                username: loginData.user.username,
                role: 'admin',
                email: loginData.user.email
            }
        }, process.env.JWT_SECRET!, {expiresIn: expiredToken})
        const returnSuccess = {
            data: {
                id: loginData.user.id,
                username: loginData.user.username,
                role: 'admin',
                email: loginData.user.email
            },
            token: token
        }
        return sendResponse(res, true, returnSuccess, 'login success', 200)
    } else {
        return sendResponse(res, false, null, loginData.message || 'invalid password', 403)
    }
}