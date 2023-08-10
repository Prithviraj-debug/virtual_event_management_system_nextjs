import { useGlobalContext } from "@/app/context/user.context"
import axios from "axios";
import Link from "next/link";

export default function Card({ event }: any) {
    const { userId, email } = useGlobalContext();
    const data = {
        userId,
        email
    }

    const rsvpHandle = async () => {
        try {
            const res = await axios.post('/api/events/rsvpevent', data)
            console.log(res);
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div className="card-contianer" key={event._id}>
            <div className="card-container">
                <img
                    src={`https://robohash.org/${event._id}?set=set2&size=180x180`}
                    alt='cardimg'
                />
                <h1 className="mt-2">{event.eventname}</h1>
                <p>Organized by {event.organizer}</p>
                <p><img src="/calender.png" alt='time: ' />&nbsp; {event.date} at {event.time}</p>
                <p>Category(s): {event.category}</p>
                {
                    userId ? (
                        <div className="flex justify-between">
                            <Link href={event.url} className="bg-slate-500 p-3 text-white mt-2 text-center rounded-md hover:opacity-70">Join Now</Link>
                            <button className="bg-slate-500 p-3 text-white mt-2 text-center rounded-md hover:opacity-70" onClick={() => rsvpHandle()}>RSVP</button>
                        </div>
                    ) : (
                        <p className="bg-red-300 p-2 rounded-md">Please! login to participate in this event...</p>
                    )
                }
            </div>      
        </div>
    )
}