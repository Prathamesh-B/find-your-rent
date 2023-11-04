"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { PasswordInput, Input, Button } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
// import { MdOutlineClose } from "react-icons/md";
// import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push("/");
        }
    }, [])

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            updateNotification({
                id: 'signin',
                color: 'green',
                autoClose: 5000,
                // icon: <FaSignInAlt />,
                title: "Logging",
                message: 'Logged in Successfully',
                loading: false,
            })
            router.push("/");
        }
        else {
            updateNotification({
                id: 'signin',
                color: 'red',
                autoClose: 5000,
                // icon: <MdOutlineClose />,
                title: "Error",
                message: 'Invalid credentials',
                loading: false,
            })
        }
    }
    
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (<>
        <div className="py-4" />
        <div className="mt-14 p-4 w-auto max-w-sm mx-auto overflow-hidden bg-white border rounded-lg">
            <div className="px-6 py-4">
                <h2 className="text-3xl font-bold text-center text-gray-700">Login</h2>
                <h3 className="mt-1 text-xl font-medium text-center text-gray-600">Welcome Back</h3>
                <form onSubmit={(e) => {
                    handleSubmit(e);
                    showNotification({
                        id: 'signin',
                        autoClose: false,
                        disallowClose: true,
                        color: 'cyan',
                        title: "Loding",
                        message: 'Waiting for server',
                        loading: true,
                    })
                }} >
                    <div className="w-full mt-4">
                        <Input
                            variant="default"
                            name="email" type="email"
                            placeholder="Email Address"
                            required onChange={onChange}
                        />
                    </div>

                    <div className="w-full mt-4">
                        <PasswordInput
                            name="password"
                            minLength={3}
                            maxLength={16}
                            onChange={onChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <Button mt="md" fz="md" fullWidth color="rgba(238, 147, 34, 1)" type='submit'>Login</Button>
                </form>
            </div>
            <div className="flex items-center justify-center py-4 text-center bg-gray-50">
                <span className="text-sm text-gray-600">Don&apos;t have an account? </span>
                <Link href="/signup" ><div className="mx-2 text-sm font-bold text-orange-400 hover:underline">Register</div></Link>
                </div>
        </div>
    </>
    )
}

export default Login