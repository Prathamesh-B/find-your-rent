const jwt = require("jsonwebtoken");
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db'

export async function POST(req) {
    try {
        const body = await req.json();
        const { id, authToken } = body;
        jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);
        const deletedItem = await prisma.item.delete({
            where: {
                id: parseInt(id),
            }
        })
        return NextResponse.json({ success: true, deletedItem, message: "Item Deleted" }, { status: 200 })
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError){
            return NextResponse.json({ success: false, message: "JsonWebTokenError: invalid signature!" }, { status: 401 })
        }
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}