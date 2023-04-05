import { useEffect, useState } from "react"
import axios from "axios"
import { PendingPermissionCard } from "../../components/PendingPermissionCard"
import { Link, useNavigate } from "react-router-dom"

export const Permission = () => {

    const [pendingEvents, setPendingEvents] = useState([])

    useEffect(()=>{
        const fetchData = async () => {
            const response = await axios.get('/api/events?status=pending')
            const data = response.data
            console.log(data);

            setPendingEvents(data.map((element)=>{
                return {
                    title: element.title,
                    startDate: element.startTime,
                    endDate: element.endTime,
                    id: element._id
                }
            }))

            console.log(pendingEvents)
            // setIsFetched(true)

        }
        fetchData()
    },[])


    return (
        <div className="permission">

            <h2>Pending Permissions</h2>
            {pendingEvents.map((event)=>{
                return <PendingPermissionCard key={event.id} permission={event} />
            })}
            <a href='/permissions/form'>Request Permission</a>
        </div>
    )
}