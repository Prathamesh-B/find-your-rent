const jwt = require("jsonwebtoken");
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db'

// Create a new rental request
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

        // Check if the renter is the owner of the item
        if (item.ownerId === UserInfo.id) {
            return NextResponse.json({ success: false, message: 'You cannot rent your own item' }, { status: 400 });
        }

        // Create a new rental
        const newRental = await prisma.rental.create({
            data: {
                renterId: UserInfo.id,
                itemId: parseInt(itemId),
                startDate: new Date(Date.now()),
                endDate: new Date(Date.now()),
                status: 'Pending',
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
        const items = await prisma.rental.findUnique({
            where: { id: parseInt(rentId) },
            include: { item: true }
        });

        // Check if the user is the owner of the rental
        const isOwner = items.item.ownerId === parseInt(UserInfo.id);

        if (!isOwner) {
            return NextResponse.json({ success: false, message: "You don't have permission to approve this rental" }, { status: 403 });
        }

        // Update the rental status to "approve"
        const updatedRental = await prisma.rental.update({
            where: { id: parseInt(rentId), renterId: parseInt(rentalId) },
            data: { status: 'Approved' },
        });

        // Check if the item was denied and update its availability
        if (items.status === 'Denied') {
            // Update the item's availability to true
            await prisma.item.update({
                where: { id: parseInt(updatedRental.itemId) },
                data: { isAvailable: false },
            });
        }

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
        const items = await prisma.rental.findUnique({
            where: { id: parseInt(rentId) },
            include: { item: true }
        });

        // Check if the user is the owner of the rental
        const isOwner = items.item.ownerId === parseInt(UserInfo.id);

        if (!isOwner) {
            return NextResponse.json({ success: false, message: "You don't have permission to deny this rental" }, { status: 403 });
        }

        // Update the rental status to "deny"
        const updatedRental = await prisma.rental.update({
            where: { id: parseInt(rentId), renterId: parseInt(rentalId) },
            data: { status: 'Denied' },
        });

        // Update the item's availability to true
        await prisma.item.update({
            where: { id: parseInt(updatedRental.itemId) },
            data: { isAvailable: true },
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
