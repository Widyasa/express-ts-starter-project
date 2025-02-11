import {prisma} from "../../utils/prisma";
import {sendResponse} from "../../utils/sendResponse";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import bcrypt from 'bcrypt'
import {Register} from "../../types/register";
dotenv.config()
const findStaffCredentials = async (email: string) => {
    const findUser = await prisma.staff.findUnique({where: {email}});
    if (!findUser) {
        return {success: false, message: 'user not found'}
    }
    return {success: true, user: findUser};
}
export const loginStaffService = async (res:any, email: string, password: string) => {
    const loginData = await findStaffCredentials(email)
    if (!loginData.success || !loginData.user) {
        return sendResponse(res, false, null, loginData.message || 'user not found', 403)
    }
    const passwordValidation = await bcrypt.compare(loginData.user.password,password )
    const expiredToken:number = 60 * 60 * 72
    if (passwordValidation) {
        const token = jwt.sign({
            data: {
                id: loginData.user.id,
                username: loginData.user.username,
                role: 'staff',
                email: loginData.user.email
            }
        }, process.env.JWT_SECRET!, {expiresIn: expiredToken})
        const returnSuccess = {
            data: {
                id: loginData.user.id,
                username: loginData.user.username,
                role: 'taff',
                email: loginData.user.email
            },
            token: token
        }
        return sendResponse(res, true, returnSuccess, 'login success', 200)
    } else {
        return sendResponse(res, false, null, loginData.message || 'invalid password', 403)
    }
}

export const registerStaffService = async (res:any, request:Register) => {
    const hashedPassword = await bcrypt.hash(request.password, 255)
    const findUser = await prisma.staff.findUnique({
        where: {
            email: request.email,
            username: request.username
        }
    })
    if (findUser) {
        return sendResponse(res, false, null, 'User does exist, change your email and username', 403)
    }
    try {
        const resUser = await prisma.staff.create({
            data: {
                username: request.username,
                email: request.email,
                password: hashedPassword,
                address: request.address,
                phone: request.phone,
                name: request.name
            }
        })
        const returnValue = {
            resUser
        }
        return sendResponse(res, true, returnValue, 'Register success', 201)
    } catch (e) {
        console.log(e)
        return sendResponse(res, false, e, "Register Failed", 500)
    }

}