'use client';

import Card from './card.component';
import './events_showcase.styles.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Showcase() {

    const [eventsData, setEventsData] = useState([])

    const getAllEvents: any = async () => {
        try {
          const res = await axios.get("/api/events/getevents");
          setEventsData(res.data.data)
          console.log("events", eventsData);
        } catch (error: any) {
          console.log(error)
        }
      }

      useEffect(() => {
        getAllEvents();
      })
    return (
        <div className='flex flex-col items-center'>
            <h1 className='font-bold text-3xl my-8'>Upcoming Events...</h1>
            <div className="form-control mb-6">
                    <input type="text" placeholder="Search Events" className="input input-bordered w-full md:w-auto bg-white text-black placeholder:text-gray-900" />
                </div>
            <div className="card-list">
                {
                    eventsData.map((event) => 
                        <Card event={event} key={event} />
                    )
                }
            </div>
        </div>
    )
}