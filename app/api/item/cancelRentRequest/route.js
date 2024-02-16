const jwt = require("jsonwebtoken");
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db'

export async function POST(req) {
    try {
        const body = await req.json();
        const { rentId, authToken } = body;
        const UserInfo = jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);

        const rental = await prisma.rental.findUnique({
            where: { id: parseInt(rentId) },
        });

        if (!rental) {
            return NextResponse.json({ success: false, message: "Rental request not found" }, { status: 404 });
        }

        if (rental.renterId !== UserInfo.id) {
            return NextResponse.json({ success: false, message: "You don't have permission to cancel this rental" }, { status: 403 });
        }

        // Delete rent request from database
        await prisma.rental.delete({
            where: { id: parseInt(rentId) },
        })

        return NextResponse.json({ success: true, message: 'Rent request canceled successfully' }, { status: 200 });

    } catch (error) {
        console.error("Error during rent cancellation:", error);
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ success: false, message: "JsonWebTokenError: invalid signature!" }, { status: 401 })
        }
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 })
    }
}