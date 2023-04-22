import { useState } from "react";

const PrevVenue = ({venue}) => {

    const [checked, setChecked] = useState(true);

    return (
        <div className="prev-venue">
            <p>{venue.name}</p>
            {checked && <i className="fa fa-times" aria-hidden="true"></i>}
            {!checked && <i className="fa fa-check" aria-hidden="true"></i>}
        </div>
    )
}

export default PrevVenue