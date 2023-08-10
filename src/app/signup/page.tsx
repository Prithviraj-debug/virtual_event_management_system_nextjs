"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SigupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("succss", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user])

    return (
        <div className="sign flex items-center justify-center min-h-screen py-2 bg-gray-900">
            <Link href="/">
                <img src="/back.png" alt="back" className="absolute top-8 left-5 cursor-pointer hover:scale-90 transition-all" />
            </Link>
            <div className="w-fit flex flex-col gap-3">
                    <input 
                        id="username"
                        type="text"
                        value={user.username} 
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="Username"
                        className="input p-3 w-fit max-w-xs"
                    />
                    <input 
                        id="email"
                        type="text"
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
                        onClick={onSignup}
                        className={`btn btn-outline mt-2 ${buttonDisabled ? "btn-disabled" : ""}`}
                    >Signup</button>

                <p className="mt-5 text-sm text-center">Already have an account? <Link href="/login" className="cursor-pointer">Login</Link></p>
                </div>
        </div>
    )
}