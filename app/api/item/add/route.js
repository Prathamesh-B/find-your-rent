const jwt = require("jsonwebtoken");
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db'

export async function POST(req) {
    try {
        const body = await req.json();
        const { title, description, price, authToken, photos, isAvailable } = body;
        const UserInfo = jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);
        const newItem = await prisma.item.create({
            data: {
                title,
                description,
                price: parseInt(price),
                photos,
                isAvailable,
                owner: {
                    connect: {
                        id: parseInt(UserInfo.id)
                    }
                }
            }
        })
        return NextResponse.json({ success: true, newItem }, { status: 201 })
    } catch (error) {
        console.log(error)
        if (error instanceof jwt.JsonWebTokenError){
            return NextResponse.json({ success: false, message: "JsonWebTokenError: invalid signature!" }, { status: 401 })
        }
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 })
    }
}