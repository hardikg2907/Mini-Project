import React, { useState } from "react";
import {CgClose} from 'react-icons/cg'
import {FaCheck} from 'react-icons/fa'
import {FiClock} from 'react-icons/fi'
import { Popup } from "./Popup";


export const ProgressBar=({event})=>{

    // console.log(event.statusBar)
    const [isHovering,setIsHovering] = useState(false)

    return(
        <div className="barBody">
            <div className="bar-container">
              <div className="steps">
                {
                    event.statusBar.map((e)=>{
                        return <div key={e.authority}>
                        <span className={`circle ${e.status}`} onMouseOver={()=>setIsHovering(true)} onMouseOut={()=>setIsHovering(false)}>
                          {e.status=='approved'?<FaCheck className="approved"/>:e.status=='rejected'?<CgClose className="rejected"/>:<FiClock className="pending"/>}
                        </span>
                        {isHovering && <Popup authority={e}/>}
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