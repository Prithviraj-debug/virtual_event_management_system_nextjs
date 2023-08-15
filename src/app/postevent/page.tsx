'use client';

import Link from "next/link"
import { useState } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/user.context";
import Swal from "sweetalert2";

export default function PostEvent() {
    const router = useRouter();
    const {userId, eventAdded, setEventAdded} = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    console.log(userId)

    const [event, setEvent] = useState({
        postedby: "",
        eventname: "",
        organizer: "",
        date: "",
        time: "",        
        url: "",
        category: ""
    });

    
    const onPostHandler = async () => {
        try {
            setLoading(true);
            event.postedby = userId;
            const response = await axios.post("/api/events/postevent", event);
            setEventAdded(event.eventname)
            Swal.fire({
                title: 'Event Posted',
                icon: 'success',
                confirmButtonText: 'OK'
              });
            console.log("succss", response.data);
            router.push("/");
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="sign flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
            <h1 className="text-2xl mb-4 font-bold capitalize">Tell us about your event!</h1>
            <Link href="/">
                <img src="/back.png" alt="back" className="absolute top-8 left-5 cursor-pointer hover:scale-90 transition-all" />
            </Link>
            <div className="w-fit flex flex-col gap-3">
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
                        onClick={onPostHandler}
                        className={`btn btn-outline mt-2 ${buttonDisabled ? "btn-disabled" : ""}`}
                    >Post</button>

                </div>
        </div>
    )
}