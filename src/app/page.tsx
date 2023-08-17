"use client";

import { useState, useEffect } from 'react'
import Showcase from "@/components/events_showcase/events_showcase.component.jsx";
import Navbar from "@/components/navbar";
import { useGlobalContext } from './context/user.context';
import { GridLoader } from 'react-spinners';
import axios from 'axios';

export default function Home() {
  const { userId, setUserId, username, setUsername, email, setEmail } = useGlobalContext();
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    _id: "",
    username: "",
    email: "",
});

  const getUserDetail: any = async () => {
    try {
      setLoading(true);
        const res = await axios.get("/api/users/user")
        setData(res.data.data);
        console.log(data)
    } catch (error: any) {
        console.log(error.message);
    }
    finally {
      setLoading(false);
    }
}

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
  getUserDetail();
}, [])

  useEffect(() => {
      setTimeout(() => {
        setLoading(false);
        setUserId(data._id)
        setUsername(data.username)
        setEmail(data.email)
      }, 1000);
  })

  return (
    <div className='bg-white text-black flex flex-col items-center min-h-screen justify-center'>
    <div className={`bg-white text-black flex flex-col items-center ${loading ? 'hidden' : 'block'}`}>
      <Navbar />
      <img src="/event.jpg" alt='banner' />
      <Showcase eventsData={eventsData} />

      </div>
      {
        loading && (
          <GridLoader  color="#64748b" />
          )
        }
        </div>
  )
}
