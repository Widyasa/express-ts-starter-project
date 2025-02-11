import {createPaginator} from "prisma-pagination";
import {Prisma, Staff} from "@prisma/client";
import {prisma} from "../utils/prisma";
import { RequestGetAll } from "../types/requestGetAll";
import bcrypt from 'bcrypt';

export const findStaff = async (request:RequestGetAll) => {
    const paginate = createPaginator({perPage:10})
    try {
        return await paginate<Staff, Prisma.StaffFindManyArgs>(
            prisma.staff,
            {
                where: {
                    name: request.search
                }
            },
            {
                page: request.page
            }
        )
    } catch (error) {
        console.log(error)
        return error
    }
}

export const findStaffById = async (id:string) => {
    try {
        return await prisma.staff.findFirst({where: {id}})
    } catch(error) {
        console.log(error)
        return error
    }

}

export const createStaff = async (request:Staff) => {
    const hashedPassword = await bcrypt.hash(request.password, 255)
    try {
        return await prisma.staff.create({
            data: {
                name: request.name,
                email: request.email,
                password: hashedPassword,
                username: request.username,
                address: request.address,
                phone: request.phone
            }
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const editStaff = async (id:string, request:Staff) => {
    try {
        return await prisma.staff.update({
            where: {id},
            data: {
                name: request.name,
                email: request.email,
                username: request.username,
                address: request.address,
                phone: request.phone,
                updatedAt: new Date().toISOString()
            }
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteStaff  = async (id:string) => {
    try {
        return await prisma.staff.delete({where: {id}})
    } catch (error) {
        console.log(error)
        return error
    }
}

export const uploadImage = async (id:string, request:any) => {
    try {
            const filePath = `upload/staff/${request.file.filename}`
            return await prisma.staff.update({
                where: {id},
                data: {
                    image: filePath
                }
            })
    } catch (error) {
        console.log(error)
        return error
    }
}