'use client';

import Card from './card.component';
import './events_showcase.styles.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Showcase() {
    const [eventsData, setEventsData] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [loading, setLoading] = useState(false);

    eventsData.reverse();

    const getAllEvents = async () => {
        try {
          setLoading(true)
          const res = await axios.get("/api/events/getevents");
          console.log("res: ", res)
          setEventsData(res.data.data)
          console.log("events", eventsData);
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false);
        }
    }

      useEffect(() => {
        getAllEvents();
      }, [])

      useEffect(() => {
        const newFilteredEvents = eventsData.filter((event) => {
          return event.eventname.toLocaleLowerCase().includes(searchField) || event.date.includes(searchField) || event.category.toLocaleLowerCase().includes(searchField);
        });
    
        setFilteredEvents(newFilteredEvents);
      }, [eventsData, searchField])

      const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        setSearchField(searchFieldString);
      }

    return (
        <div className='flex flex-col items-center'>
          <div>
            <h1 className='font-bold text-3xl my-8'>Upcoming Events...</h1>
          </div>
            <div className="inline form-control mb-6">
                    <input type="text" placeholder="Search by title or category" className="input input-bordered w-fit md:w-auto bg-white text-black placeholder:text-gray-900 ml-2 text-sm" onChange={onSearchChange} />

                    <input type='date' className='bg-slate-500 rounded-md p-2 text-white ml-2' onChange={onSearchChange} />
                    
                   </div>
            <div className="card-list">
                {
                    filteredEvents.map((event, i) => 
                        <Card event={event} key={i} />
                    )
                }
            </div>
        </div>
    )
}