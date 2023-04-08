import {createContext, useEffect, useReducer, useContext, useState} from 'react'
import axios from 'axios'
import { useAuthContext } from './AuthContext'

export const EventContext = createContext()

export const EventContextProvider = ({ children }) => {

    const [allEvents, setAllEvents] = useState([])
    const [userEvents, setUserEvents] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedEvent,setSelectedEvent] = useState(null)
    const {user} = useAuthContext()

    useEffect(()=>{
        // console.log(user.email)
        const fetchData = async () => {
            let response = await axios.get('/api/events')
            console.log(response.data)
            setAllEvents(response.data)
            console.log(allEvents)
            
            
            setIsFetched(true)

        }
        // if(user)
        fetchData()
    },[])

    return (<EventContext.Provider value={{allEvents,userEvents,isFetched,showModal,setShowModal, setUserEvents,selectedEvent,setSelectedEvent}}>
        {children}
    </EventContext.Provider>)
}

export const useEventContext = () => {
    return useContext(EventContext)
}