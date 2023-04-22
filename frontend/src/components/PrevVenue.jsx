import { useState } from "react";
import { useEventContext } from "../context/EventContext";

const PrevVenue = ({venue}) => {

    const [checked, setChecked] = useState(true);
    const {changedVenues,setChangedVenues} = useEventContext()

    const handleClick = () => {
        // venue.name = checked?"hello":"bye"
        const updatedVenues = changedVenues;
        updatedVenues?.forEach((e)=>{
            if(e._id==venue._id) e.checked=checked;
            if(e._id==venue._id) console.log('checked');
        })
        console.log(updatedVenues)
        setChangedVenues(updatedVenues)
        console.log(changedVenues)
    }

    return (
        <div className={checked ? "prev-venue":"prev-venue faded"}>
            <p>{venue.name}</p>
            {checked && <i className="fa fa-times" aria-hidden="true" onClick={()=>{setChecked(!checked);handleClick()}}></i>}
            {!checked && <i className="fa fa-check" aria-hidden="true" onClick={()=>{setChecked(!checked);handleClick()}}></i>}
        </div>
    )
}

export default PrevVenue