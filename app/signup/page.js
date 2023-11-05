"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { PasswordInput, Input } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
// import { MdOutlineDone, MdOutlineClose } from "react-icons/md";

const Signup = () => {
    const router = useRouter()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push("/");
        }
    })
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("api/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: credentials.username, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            updateNotification({
                id: 'signin',
                color: 'green',
                autoClose: 5000,
                // icon: <MdOutlineDone />,
                title: "Done",
                message: 'Account Created Successfully',
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
                message: 'Account with this email already exists',
                loading: false,
            })
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="py-4" />
            <div className="mt-14 p-4 w-auto max-w-sm mx-auto overflow-hidden bg-white border rounded-lg">
                <div className="px-6 py-4">
                    <h2 className="text-3xl font-bold text-center text-gray-700">Signup</h2>
                    <h3 className="mt-1 text-xl font-medium text-center text-gray-600">Create Account</h3>
                    <form onSubmit={(e) => {
                        handleSubmit(e);
                        showNotification({
                            id: 'signin',
                            autoClose: false,
                            color: 'cyan',
                            title: "Loding",
                            message: 'Creating New Account',
                            loading: true,
                        })
                    }} >
                        <div className="w-full mt-4">
                            {/* <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="email" type="email" placeholder="Email Address" required onChange={onChange} /> */}
                            <Input
                                variant="default"
                                name="username"
                                placeholder="User Name"
                                required
                                onChange={onChange} />
                        </div>
                        <div className="w-full mt-4">
                            {/* <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="email" type="email" placeholder="Email Address" required onChange={onChange} /> */}
                            <Input
                                variant="default"
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                required
                                onChange={onChange} />
                        </div>
                        <div className="w-full mt-4">
                            {/* <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="password" type="password" placeholder="Password" required minLength={3} maxLength={16} onChange={onChange} /> */}
                            <PasswordInput
                                name="password"
                                minLength={3}
                                maxLength={16}
                                onChange={onChange}
                                placeholder="Password"
                                required
                            />
                        </div>
                    <button className="mt-4 w-full px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none" type="submit">Sign up</button>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50">
                    <span className="text-sm text-gray-600">Already have an account? </span>
                    <Link href="/login" ><div className="mx-2 text-sm font-bold text-orange-400 hover:underline">Login</div></Link></div>
            </div>
        </>
    )
}

export default Signup