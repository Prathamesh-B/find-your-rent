import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db'

export async function GET(req) {
    try {
        const itemId = req.url.split("getItem/")[1]
        // Fetch the specific item by ID
        const item = await prisma.item.findUnique({
            where: {
                id: parseInt(itemId)
            },
        });
        if(!item){
            return NextResponse.json({ success: false, message: "Item not found!" }, { status: 404 });
        }
        return NextResponse.json({ success: true, item }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}