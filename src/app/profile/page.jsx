"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileEvent from "@/components/profile-event/profile-event.component";
import Swal from "sweetalert2";

export default function ProfilePage() {
    const router = useRouter();
    
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
            Swal.fire({
                title: 'Logout',
                icon: 'success',
                confirmButtonText: 'OK'
              });
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
                <p>Username: {data.username}</p>
                <p>Email: {data.email}</p>
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
                        {
                            eventData.map((event, i) => (
                                <ProfileEvent event={event} key={i} />
                            ))
                        }
                </div>
            </div>
                {isLoading && (
                    <span className="loading loading-infinity loading-lg absolute"></span>
                )}
        </div>
    )
}