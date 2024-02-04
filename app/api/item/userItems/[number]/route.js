import { NextResponse } from 'next/server';
const jwt = require("jsonwebtoken");
import prisma from '@/app/lib/db'

export async function POST(req) {
    try {
        const body = await req.json();
        const { authToken } = body;
        const UserInfo = jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);
        const page = req.url.split("userItems/")[1] - 1
        const result = await prisma.item.findMany({
            skip: page > 0 ? page * 8 : 0,
            take: 8,
            where: {
                ownerId: UserInfo.id, // Filter items by user ID
            }
        });
        return NextResponse.json({ success: true, result }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}