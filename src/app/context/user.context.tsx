'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'


interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    email: string,
    setEmail: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    username: '',
    setUsername: (): string => '',
    email: '',
    setEmail: (): string => ''
})

 export const GlobalContextProvider = ({ children }: any) => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    return (
        <GlobalContext.Provider value={{ userId, setUserId, username, setUsername, email, setEmail }}>
            {children}
        </GlobalContext.Provider>
    )
 }

 export const useGlobalContext = () => useContext(GlobalContext);