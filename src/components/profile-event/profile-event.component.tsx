"use client";

import Link from "next/link"
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from 'react'
import {GridLoader} from "react-spinners"

export default function ProfileEvent ({ event }: any) {
    const { _id } = event;
    const [loading, setLoading] = useState(false);

    const deleteEvent = async () => {
        try {
            setLoading(true);
            const response = await axios.delete('/api/events/updateevent', {
                data: { id: _id }
              });
              Swal.fire({
                title: 'Event Deleted',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              window.location.reload();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
        <tr className="flex flex-col my-5 bg-slate-500 text-white p-3 rounded-lg hover:bg-slate-950 cursor-pointer">
            <div className="flex items-center justify-between w-full">
                <h1 className="font-extrabold text-xl border-b-2">
                    {event.eventname}
                </h1>
                <div className="flex gap-5 justify-center items-center">
                    <Link href={`/editevent/${_id}`}>
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
        {
            loading && (
                <GridLoader  color="#64748b" />
            )
        }
        </div>
    )
}