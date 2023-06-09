import React, { useEffect, useState } from "react"
import Login from '../components/Login'
import Calendar from '../components/Calendar'
import axios from 'axios'
import { LoadingScreen } from "../components/LoadingScreen"

export const Home = () => {

    const [events, setEvents] = useState([]);
    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/events?status=approved')
            const data = response.data
            // console.log(data);

            setEvents(data.map((element) => {
                return {
                    title: element.title,
                    startDate: element.startTime,
                    endDate: element.endTime,
                    id: element._id
                }
            }))

            // console.log(events)
            setIsFetched(true)

        }
        fetchData()
    }, [])

    return (
        <div>
            <style>{'body { background-color: #3DA6FC; }'}</style>
            <div className="header">CampusConnect</div>
            {isFetched ?
                <div className="home">
                    <div>
                        <Login />
                    </div>
                    <div className="calendar">
                        {isFetched && <Calendar events={events} />}
                    </div>
                </div>
                : <LoadingScreen/>}
        </div>
    );
}