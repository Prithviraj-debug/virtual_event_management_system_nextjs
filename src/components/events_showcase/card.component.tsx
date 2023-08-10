export default function Card({ event }: any) {
    return (
        <div className="card-contianer" key={event._id}>
            <div className="card-container">
                <img
                    src="/eventcard.jpg"
                    alt='cardimg'
                />
                <h1 className="mt-2">{event.eventname}</h1>
                <p>Organized by {event.organizer}</p>
                <p><img src="/calender.png" alt='time: ' />&nbsp; {event.date} at {event.time}</p>
            </div>      
        </div>
    )
}