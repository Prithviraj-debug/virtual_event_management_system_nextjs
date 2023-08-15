'use client';

import Link from "next/link"
import { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { GridLoader } from 'react-spinners';

export default function PostEvent({params}: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const id = params.id;

    const [event, setEvent] = useState({
        id: params.id,
        eventname: "",
        organizer: "",
        date: "",
        time: "",        
        url: "",
        category: ""
    });

    const getCurrentEvent = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/events/event", {
                data: { id: params.id }
              });
              setEvent(res.data.data)
              console.log(event)

        } catch(error: any) {
            console.log(error)
        } finally {
            setLoading(false);
        }
        
    }

    
    const updateEventDetails = async () => {
        try {
            console.log(event)
            const response = await axios.put("/api/events/updateevent", event);
            console.log("succss", response.data);
            Swal.fire({
                title: 'Changes Saved',
                icon: 'success',
                confirmButtonText: 'OK'
              });
            router.push('/')
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCurrentEvent();
    }, [])

    return (
        <div className="sign flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
            <h1 className="text-2xl mb-4 font-bold capitalize">{loading ? 'Processing' : "Edit your event!"}</h1>
            <Link href="/">
                <img src="/back.png" alt="back" className="absolute top-8 left-5 cursor-pointer hover:scale-90 transition-all" />
            </Link>
            <div className={`w-fit flex flex-col gap-3 ${loading ? 'hidden' : ''}`}>
                    <input 
                        id="eventname"
                        type="text"
                        value={event.eventname} 
                        onChange={(e) => setEvent({...event, eventname: e.target.value})}
                        placeholder="Eventname"
                        className="input p-3 w-fit max-w-xs"
                        required
                    />

                    <input 
                        id="organizer"
                        type="text"
                        value={event.organizer} 
                        onChange={(e) => setEvent({...event, organizer: e.target.value})}
                        placeholder="Organizer"
                        className="input p-3 w-fit max-w-xs"
                        required
                    />

                    <input 
                        id="date"
                        type="date"
                        value={event.date} 
                        onChange={(e) => setEvent({...event, date: e.target.value})}
                        className="input p-3 w-fit max-w-xs"
                        required
                    /> 

                    <input 
                        id="time"
                        type="time"
                        value={event.time} 
                        onChange={(e) => setEvent({...event, time: e.target.value})}
                        className="input p-3 w-fit max-w-xs"
                        required
                    />  

                    <input 
                        id="url"
                        type="url"
                        value={event.url} 
                        onChange={(e) => setEvent({...event, url: e.target.value})}
                        placeholder="Paste the event URL here.."
                        className="input p-3 w-fit max-w-xs"
                        required
                    />  

                    <input 
                        id="category"
                        type="text"
                        value={event.category} 
                        onChange={(e) => setEvent({...event, category: e.target.value})}
                        placeholder="Category (e.g. Tech, business..."
                        className="input p-3 w-fit max-w-xs"
                        required
                    />

                    <button
                        onClick={updateEventDetails}
                        className={`btn btn-outline mt-2 ${buttonDisabled ? "btn-disabled" : ""}`}
                    >Update</button>

                </div>
                {loading && (
                    <GridLoader  color="#64748b" />
                )}
        </div>
    )
}