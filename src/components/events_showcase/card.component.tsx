import Image from "next/image";

export default function Card({ event }: any) {
    console.log(event)
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
            </div>      
        </div>
    )
}