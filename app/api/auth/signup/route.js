const jwt = require("jsonwebtoken");
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '../../../lib/db'

export async function POST(req) {
    try {
        const body = await req.json();
        const { username, email, password } = body;
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        })

        if (existingUserByEmail) {
            return NextResponse.json({ success: false, message: "Account with this email already exists" }, { status: 409 })
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        const authtoken = jwt.sign(newUser?.id, process.env.JWT_SECRET);

        return NextResponse.json({ success: true, authtoken }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 })
    }
}