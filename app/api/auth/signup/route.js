const jwt = require("jsonwebtoken");
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/app/lib/db'

export async function POST(req) {
    try {
        const body = await req.json();
        const { username, email, mobile, password } = body;

        // Check if user with the provided email already exists
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        })

        if (existingUserByEmail) {
            return NextResponse.json({ success: false, message: "Account with this email already exists" }, { status: 409 })
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create a new user with the provided data
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                mobile,
                password: hashedPassword
            }
        })

        // Generate JWT token for the new user
        const authtoken = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.NEXT_PUBLIC_JWT_SECRET);

        // Respond with success and the generated token
        return NextResponse.json({ success: true, authtoken }, { status: 201 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}
