import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()
export async function adminSeeder() {
    const hashedPassword = await bcrypt.hash('123456', 255)
    await prisma.admin.create({
        data: {
                name: 'admin',
                email: 'admin@gmail.com',
                password: hashedPassword,
                username: 'admin',
            }
        })
    }