import React, { useEffect, useState } from "react"
import Login from '../components/Login'
import Calendar from '../components/Calendar'
import axios from 'axios'

export const Home = () => {

    const [events, setEvents] = useState([]);
    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/events?status=pending')
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
                : <p>Loading...</p>}
        </div>
    );
}