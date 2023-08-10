"use client";

import { useState, useEffect } from 'react'
import Showcase from "@/components/events_showcase/events_showcase.component";
import Navbar from "@/components/navbar";
import { useGlobalContext } from './context/user.context';
import axios from 'axios';

export default function Home() {
  const { userId, setUserId, username, setUsername, email, setEmail } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    _id: "",
    username: "",
    email: "",
});

  const [isLoading, setIsLoading] = useState(false);
  
  const getUserDetail: any = async () => {
    try {
        setIsLoading(true);
        const res = await axios.get("/api/users/user")
        setData(res.data.data);
        console.log(data)
        setUserId(data._id)
        setUsername(data.username)
        setEmail(data.email)
    } catch (error: any) {
        console.log(error.message);
    }
    finally {
        setIsLoading(false);
    }
}

useEffect(() => {
  getUserDetail();
}, [loading])

  useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
  })

  return (
    <>
    <div className={`bg-white text-black flex flex-col items-center ${loading ? 'hidden' : 'block'}`}>
      <Navbar />
      <img src="/event.jpg" alt='banner' />
      <Showcase />

      </div>
      {
        loading && (
          <div className="loading">
                <div className="loader" />
            </div>
          )
        }
        </>
  )
}
