"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/user.context";

export default function ProfilePage() {
    const router = useRouter();
    const { userId, username, email } = useGlobalContext();
    
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        _id: "",
        username: "",
        email: "",
    });
    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log("success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const getUserDetail: any = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get("/api/users/user")
            setData(res.data.data);
        } catch (error: any) {
            console.log(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        getUserDetail();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className={`${isLoading ? 'hidden' : 'block'}`}>
                <h1>Profile</h1>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                
                    <button
                    onClick={logout}
                    className="btn btn-accent mt-3"
                    >
                        Logout
                    </button>
                
            </div>
                {isLoading && (
                    <span className="loading loading-infinity loading-lg absolute"></span>
                )}
        </div>
    )
}