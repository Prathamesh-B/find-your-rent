const jwt = require("jsonwebtoken");
import { NextResponse } from 'next/server';
const bcrypt = require("bcryptjs");
import prisma from '../../../lib/db'

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        })

        if (!existingUser) {
            return NextResponse.json({ success: false, message: "Please try to login with correct credentials" }, { status: 422 })
        }
        const userPassword = existingUser.password;
        const passwordCompare = await bcrypt.compare(password, userPassword);
        if (!passwordCompare) {
            return NextResponse.json({ success: false, message: "Please try to login with correct credentials" }, { status: 403 })
        }
        const authtoken = jwt.sign(existingUser.id, process.env.JWT_SECRET);
        return NextResponse.json({ success: true, authtoken }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 })
    }
}