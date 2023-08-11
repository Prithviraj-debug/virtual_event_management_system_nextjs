"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const resetFields = () => {
        setUser({
            email: "",
            password: "",
        })
    }

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log(response.data)
            resetFields();
            router.push("/");
        } catch (error: any) {
            console.log(error.message);
            resetFields();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex items-center justify-center min-h-screen py-2 bg-gray-900">
            <Link href="/">
                <img src="/back.png" alt="back" className="absolute top-8 left-5 cursor-pointer hover:scale-90 transition-all" />
            </Link>
            <div className="w-fit flex flex-col gap-3">
                    <input 
                        id="email"
                        type="email"
                        value={user.email} 
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="Email"
                        className="input p-3 w-fit max-w-xs"
                    />
                    <input 
                        id="password"
                        type="password"
                        value={user.password} 
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="Password"
                        className="input p-3 w-fit max-w-xs"
                    />      
                    <button
                        onClick={onLogin}
                        className={`btn btn-outline mt-2 ${buttonDisabled ? "btn-disabled" : ""}`}
                    >Login</button>

                <p className="mt-5 text-sm text-center">Dont have an account? <Link href="/signup" className="cursor-pointer">Sign Up</Link></p>
            </div>

            {
                 loading && (
                    <span className="loading loading-infinity loading-lg absolute"></span>
                )
            }
        </div>
    )
}