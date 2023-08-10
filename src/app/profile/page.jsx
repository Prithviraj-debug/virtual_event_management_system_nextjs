"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/user.context";
import { FiEdit, FiTrash2 } from 'react-icons/fi'

export default function ProfilePage() {
    const router = useRouter();
    const { userId, username, email } = useGlobalContext();
    
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        _id: "",
        username: "",
        email: "",
    });

    const [eventData, setEventData] = useState([]);
    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log("success", response.data);
            router.push("/login");
        } catch (error) {
            console.log(error.message);
        }
    }

    const getUserDetail = async () => {
        try {
            setIsLoading(true);
            const userRes = await axios.get("/api/users/user")
            const eventRes = await axios.get("/api/users/get_user_events")
            setData(userRes.data.data);
            setEventData(eventRes.data.data)
            console.log(eventData);
        } catch (error) {
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
        <div className="flex min-h-screen">
            <div className={`${isLoading ? 'hidden' : 'block'} bg-white text-slate-800 p-6 flex flex-col justify-between`}>
                <div>

                <h1 className="font-bold text-2xl mb-4">Profile</h1>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                </div>
                    <button
                    onClick={logout}
                    className="btn bg-slate-800 mt-3"
                    >
                        Logout
                    </button>
                
            </div>
            <div className={`${isLoading ? 'hidden' : 'block'} flex flex-col p-6 w-full`}>
                <h1 className="font-bold text-2xl mb-4">Manage Events</h1>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Events</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            eventData.map((event, i) => (
                                <tr key={event._id}>
                                    <td className="w-full">
                                        {event.eventname}
                                    </td>
                                    <td className="flex gap-5">
                                        <FiEdit cursor="pointer" className="text-white" size={20} />
                                        <FiTrash2 cursor="pointer" className="text-white" size={20} />
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
                {isLoading && (
                    <span className="loading loading-infinity loading-lg absolute"></span>
                )}
        </div>
    )
}