const jwt = require("jsonwebtoken");
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db'

export async function POST(req) {
    try {
        const body = await req.json();
        const { itemId, startDate, endDate, authToken } = body;
        const UserInfo = jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);
        // Check if the item is available
        const item = await prisma.item.findUnique({
            where: { id: parseInt(itemId) },
        });

        if (!item.isAvailable) {
            return NextResponse.json({ success: false, message: 'Item is not available for rent' }, { status: 400 });
        }

        // Create a new rental
        const newRental = await prisma.rental.create({
            data: {
                renter: { connect: { id: parseInt(UserInfo.id) } },
                item: { connect: { id: parseInt(itemId) } },
                startDate: new Date(Date.now()),
                endDate: new Date(Date.now()),
                status: 'pending',
            },
        });

        // Update the item's availability
        await prisma.item.update({
            where: { id: parseInt(itemId) },
            data: { isAvailable: false },
        });

        return NextResponse.json({ success: true, newRental }, { status: 201 });

    } catch (error) {
        console.log(error)
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ success: false, message: "JsonWebTokenError: invalid signature!" }, { status: 401 })
        }
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const { authToken } = req.headers;
        const UserInfo = jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);

        // Find all the rentals that belong to the owner's items
        const rentals = await prisma.rental.findMany({
            where: {
                item: {
                    ownerId: parseInt(UserInfo.id),
                },
            },
            include: {
                item: true, // Include the item details
                renter: true, // Include the renter details
            },
        });

        return NextResponse.json({ success: true, rentals }, { status: 200 });
    } catch (error) {
        console.log(error);
        if (error instanceof jwt.JsonWebTokenError){
            return NextResponse.json({ success: false, message: "JsonWebTokenError: invalid signature!" }, { status: 401 });
        }
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 });
    }
}