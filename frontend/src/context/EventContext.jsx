import {createContext, useEffect, useReducer, useContext, useState} from 'react'
import axios from 'axios'
import { useAuthContext } from './AuthContext'

export const EventContext = createContext()

export const EventContextProvider = ({ children }) => {

    const [allEvents, setAllEvents] = useState([])
    // const [userEvents, setUserEvents] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedEvent,setSelectedEvent] = useState(null)
    const [venues,setVenues] = useState([])
    const {user} = useAuthContext()

    useEffect(()=>{
        // console.log(user.email)
        const fetchData = async () => {
            let response = await axios.get('/api/events')
            // console.log(response.data)
            setAllEvents(response.data)
            // console.log(allEvents)
            
            setIsFetched(true)

        }
        // if(user)
        fetchData()
    },[])

    const handleChange = (selectedVenues)=> {
        // console.log(selected.Venues)
        setVenues(selectedVenues.map((e)=> {return e.value}));
        console.log(venues)
    }

    return (<EventContext.Provider value={{allEvents,isFetched,showModal,setShowModal,selectedEvent,setSelectedEvent,handleChange,venues,setVenues}}>
        {children}
    </EventContext.Provider>)
}

export const useEventContext = () => {
    return useContext(EventContext)
}