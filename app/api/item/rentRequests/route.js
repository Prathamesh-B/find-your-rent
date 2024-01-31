import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
const jwt = require("jsonwebtoken");

export async function POST(req) {
    try {
        const body = await req.json();
        const { authToken } = body;
        const UserInfo = jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);

        // Find all the pending rentals that belong to the owner
        const rentals = await prisma.rental.findMany({
            where: {
                item: {
                    ownerId: parseInt(UserInfo.id),
                },
                status: 'pending', // Only return pending rentals
            },
            include: {
                item: true, // Include the item details
                renter: true, // Include the renter details
            },
        });

        return NextResponse.json({ success: true, rentals }, { status: 200 });
    } catch (error) {
        console.log(error);
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ success: false, message: "JsonWebTokenError: invalid signature!" }, { status: 401 });
        }
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 });
    }
}


export async function PUT(req) {
    try {
        const body = await req.json();
        const { authToken } = body;
        const UserInfo = jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);

        // Find all the rentals that belong to the user
        const rentals = await prisma.rental.findMany({
            where: {
                renter: {
                    id: parseInt(UserInfo.id),
                },
            },
            include: {
                item: true, // Include the item details
            },
        });

        return NextResponse.json({ success: true, rentals }, { status: 200 });
    } catch (error) {
        console.log(error);
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ success: false, message: "JsonWebTokenError: invalid signature!" }, { status: 401 });
        }
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 });
    }
}