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

// Approve rent request
export async function PUT(req) {
    try {
        const body = await req.json();
        const { rentId, rentalId, authToken } = body;
        const UserInfo = jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);

        // Check if the user has permission to approve the rental
        const user = await prisma.user.findUnique({
            where: { id: parseInt(UserInfo.id) },
            include: { rentals: true },
        });

        // Check if the user is the owner of the rental
        const isOwner = user.rentals.some(rental => rental.renterId === parseInt(rentalId));

        if (!isOwner) {
            return NextResponse.json({ success: false, message: "You don't have permission to approve this rental" }, { status: 403 });
        }

        // Update the rental status to "approve"
        const updatedRental = await prisma.rental.update({
            where: { id: parseInt(rentId), renterId: parseInt(rentalId) },
            data: { status: 'approve' },
        });

        return NextResponse.json({ success: true, updatedRental }, { status: 200 });

    } catch (error) {
        console.log(error);
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ success: false, message: "JsonWebTokenError: invalid signature!" }, { status: 401 });
        }
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 });
    }
}

// Deny rent request
export async function PATCH(req) {
    try {
        const body = await req.json();
        const { rentId, rentalId, authToken } = body;
        const UserInfo = jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);

        // Check if the user has permission to deny the rental
        const user = await prisma.user.findUnique({
            where: { id: parseInt(UserInfo.id) },
            include: { rentals: true },
        });

        // Check if the user is the owner of the rental
        const isOwner = user.rentals.some(rental => rental.renterId === parseInt(rentalId));

        if (!isOwner) {
            return NextResponse.json({ success: false, message: "You don't have permission to deny this rental" }, { status: 403 });
        }

        // Update the rental status to "deny"
        const updatedRental = await prisma.rental.update({
            where: { id: parseInt(rentId), renterId: parseInt(rentalId) },
            data: { status: 'deny' },
        });

        return NextResponse.json({ success: true, updatedRental }, { status: 200 });

    } catch (error) {
        console.log(error);
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ success: false, message: "JsonWebTokenError: invalid signature!" }, { status: 401 });
        }
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 });
    }
}
