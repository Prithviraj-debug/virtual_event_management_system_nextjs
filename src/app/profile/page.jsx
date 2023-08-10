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

    const deleteEvent = async (event) => {
        try {
            setIsLoading(true);
            const res = await axios.delete("/api/events/deleteevent", event);
            console.log(res);
        } catch (error) {
            console.log(error);
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
                        {
                            eventData.map((event, i) => (
                                <tr key={event._id} onClick={()=>window.my_modal_2.showModal()}>
                                    
                                    <td className="bg-slate-500 w-full text-white font-semibold rounded-lg p-4 cursor-pointer hover:opacity-80">
                                        {event.eventname}
                                    </td>
                                    <td className="flex gap-5">
                                    </td>
                                    <dialog id="my_modal_2" className="modal">
                                        <form method="dialog" className="modal-box">
                                            <h3 className="font-bold text-2xl">{event.eventname}</h3>
                                            <p className="mt-3 ">Organized by: {event.organizer}</p>
                                            <p className="mt-3 ">Date: {event.date} at {event.time}</p>
                                            <p className="mt-3 ">Category(s): {event.category}</p>
                                            <div className="flex w-full justify-between items-center">
                                            <FiEdit cursor="pointer" className="text-white" size={30} />
                                            <FiTrash2 cursor="pointer" className="text-red-600 mt-4" size={30} onClick={() => deleteEvent(event._id)} />
                                            </div>  

                                            <p className="py-4">Press ESC key or click outside to close</p>
                                        </form>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>
                                </tr>
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