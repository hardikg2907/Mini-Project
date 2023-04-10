import { useEffect, useState } from "react"
import axios from "axios"
import { PendingPermissionCard } from "../../components/PendingPermissionCard"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import { PermissionsTable } from "../../components/PermissionsTable"
import { useEventContext } from "../../context/EventContext"
import { EventDetail } from "../../components/EventDetail"

export const Permission = () => {

    // const [pendingEvents, setPendingEvents] = useState([])
    const [userEvents,setUserEvents] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const {user} = useAuthContext()
    const {showModal} = useEventContext()

    useEffect(()=>{
        // console.log(user.email)
        const fetchData = async () => {
            let response = await axios.get(`/api/getUserEvents?email=${user.email}&type=${user.type}`)
            const data = user.type=='Committee'? response.data[0].events: response.data[0].permissions
            setUserEvents(data)

            console.log(userEvents)
            setIsFetched(true)

        }
        fetchData()
    },[])

    return (
        <div className="pageHeader">
            
            <div className="permHeader">
                <h2>Permission Requests</h2>
            </div>
            {isFetched? userEvents.filter(element=>element.status=='pending').map((event)=>{
                // return <PendingPermissionCard key={event._id} permission={event} />
            }) : <p>Loading...</p>}
            <PermissionsTable events={userEvents}/>
            <div className="permDiv"><Link to='/permissions/form' className="submit reqPermBtn">Request Permission</Link></div>
            {showModal && <EventDetail />}
        </div>
    )
}