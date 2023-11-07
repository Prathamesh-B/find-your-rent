import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db'

export async function GET(req) {
    try {
        const page = req.url.split("page/")[1] - 1
        const result = await prisma.item.findMany({
            skip: page > 0 ? page * 8 : 0,
            take: 8,
        });
        return NextResponse.json({ success: true, result }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}