import { useEffect, useState } from "react"
import axios from "axios"
import { PendingPermissionCard } from "../../components/PendingPermissionCard"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import { PermissionsTable } from "../../components/PermissionsTable"

export const Permission = () => {

    const [pendingEvents, setPendingEvents] = useState([])
    const [events, setEvents] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const {user} = useAuthContext()

    useEffect(()=>{
        // console.log(user.email)
        const fetchData = async () => {
            const response = await axios.get(`/api/getUserEvents?email=${user.email}`)
            const data = response.data[0].events
            setEvents(data)
            

            setPendingEvents(data.map((element)=>{
                // if(element.status=='pending')
                return {
                    title: element.title,
                    startDate: element.startTime,
                    endDate: element.endTime,
                    id: element._id
                }
            }))

            // console.log(pendingEvents)
            setIsFetched(true)

        }
        fetchData()
    },[])

    return (
        <div className="permission">
            
            <div className="permHeader">
                <h2>Permission Requests</h2>
            </div>
            {isFetched? pendingEvents.map((event)=>{
                return <PendingPermissionCard key={event.id} permission={event} />
            }) : <p>Loading...</p>}
            <Link to='/permissions/form'>Request permission</Link>
            <PermissionsTable events={events}/>
        </div>
    )
}