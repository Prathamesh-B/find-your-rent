const jwt = require("jsonwebtoken");
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db'

export async function POST(req) {
    try {
        const body = await req.json();
        const { id, title, description, price, photos, authToken } = body;
        jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);
        const updatedItem = await prisma.item.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: title,
                description: description,
                price: parseInt(price),
                photos: photos
            },
        })
        return NextResponse.json({ success: true, updatedItem, message: "Item Updated" }, { status: 200 })
    } catch (error) {
        console.log(error)
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ success: false, message: "JsonWebTokenError: invalid signature!" }, { status: 401 })
        }
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}