"use client";

import Link from "next/link"
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import axios from "axios";
import { useState } from "react";

export default function ProfileEvent ({ event }: any) {
    const { _id } = event;
    const [id, setId]: any = useState({
        id: _id
    })

    const deleteEvent = async () => {
        try {
            // setIsLoading(true);
            const response = await axios.delete('/api/events/updateevent', {
                data: { id: _id }
              });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        finally {
            // setIsLoading(false);
        }
    }

    return (
        <tr className="flex flex-col my-5 bg-slate-500 text-white p-3 rounded-lg hover:bg-slate-950 cursor-pointer">
            <div className="flex items-center justify-between w-full">
                <h1 className="font-extrabold text-xl border-b-2">
                    {event.eventname}
                </h1>
                <div className="flex gap-5 justify-center items-center">
                    <Link href={`/editevent/${event._id}`}>
                        <FiEdit cursor="pointer" className="text-white hover:text-gray-300" size={30} />
                    </Link>
                        <FiTrash2 cursor="pointer" className="text-red-600 hover:text-red-950" size={30} onClick={() => deleteEvent()} />
                </div>
            </div>
                {
                    event.rsvp_users.length>0 ? (
                        <div>
                        <h2 className="font-bold">RSVPd Users</h2>
                        {event.rsvp_users.map((user: any) => (
                            <p key={event._id}>{user}</p>
                        ))}
            </div>
                    ) : (
                        <p>No users RSVPd</p>
                    )
                }
        </tr>
    )
}