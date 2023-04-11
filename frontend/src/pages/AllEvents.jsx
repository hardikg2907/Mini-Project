import { PermissionsTable } from "../components/PermissionsTable";
import { useEventContext } from "../context/EventContext";

const AllEvents = () =>{

    const {allEvents} = useEventContext()

    return (
        <div className='pageHeader'>
            <div className="permHeader"><h2>All Events</h2></div>
            <PermissionsTable events={allEvents.filter((event)=>event.status=='approved')}/>
        </div>
    );
}

export default AllEvents