import React, { useState } from "react";
import {CgClose} from 'react-icons/cg'
import {FaCheck} from 'react-icons/fa'
import {FiClock} from 'react-icons/fi'

const Popup = ({authority}) => {

  // console.log(authority)

  return (
      <div className="popup">
          <h4>{authority.authorityName}: </h4>
          <p>{authority.status}</p>
      </div>
  )
}

export const ProgressBar=({event})=>{

    // console.log(event.statusBar)
    const [isHovering,setIsHovering] = useState(null)

    return(
        <div className="barBody">
            <div className="bar-container">
              <div className="steps">
                {
                    event.statusBar.map((e)=>{
                        return <div key={e.authority}>
                        <span className={`circle ${e.status}`} onMouseOver={()=>setIsHovering(e.authority)} onMouseOut={()=>setIsHovering(null)}>
                          {e.status=='approved'?<FaCheck className="approved"/>:e.status=='rejected'?<CgClose className="rejected"/>:<FiClock className="pending"/>}
                        </span>
                        {isHovering==e.authority && <Popup authority={e}/>}
                      </div>
                    })
                }
                <div className="progress-bar">
                  <span className="indicator"></span>
                </div>
              </div>
            </div>
        </div>
    );
}