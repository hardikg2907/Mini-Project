import { useEffect, useState } from "react"
import axios from "axios"
import { PendingPermissionCard } from "../../components/PendingPermissionCard"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import { PermissionsTable } from "../../components/PermissionsTable"
import { useEventContext } from "../../context/EventContext"
import { EventDetail } from "../../components/EventDetail"

export const Permission = () => {

    const [pendingEvents, setPendingEvents] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const {user} = useAuthContext()
    const {showModal,userEvents,setUserEvents} = useEventContext()

    useEffect(()=>{
        console.log(user.email)
        const fetchData = async () => {
            let response = await axios.get(`/api/getUserEvents?email=${user.email}`)
            const data = response.data[0].events
            setUserEvents(data)
            

            setPendingEvents(userEvents.filter(element=>element.status=='pending'))
            //     .map((element)=>{
            //     return {
            //         title: element.title,
            //         startDate: element.startTime,
            //         endDate: element.endTime,
            //         id: element._id
            //     }
            // }))

            console.log(userEvents)
            setIsFetched(true)

        }
        // if(user)
        fetchData()
    },[])

    return (
        <div className="permission">
            
            <div className="permHeader">
                <h2>Permission Requests</h2>
            </div>
            {/* {isFetched? pendingEvents.map((event)=>{
                return <PendingPermissionCard key={event._id} permission={event} />
            }) : <p>Loading...</p>} */}
            <PermissionsTable events={userEvents}/>
            <Link to='/permissions/form' className="submit">Request permission</Link>
            {showModal && <EventDetail />}
        </div>
    )
}