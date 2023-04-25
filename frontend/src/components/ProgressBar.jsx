import React from "react";
import {CgClose} from 'react-icons/cg'
import {FaCheck} from 'react-icons/fa'
import {FiClock} from 'react-icons/fi'


export const ProgressBar=({event})=>{

    console.log(event.statusBar)

    return(
        <div className="barBody">
            <div className="bar-container">
              <div className="steps">
                {
                    event.statusBar.map((e)=>{
                        return <span className={`circle ${e.status}`}>
                            {e.status=='approved'?<FaCheck className="approved"/>:e.status=='rejected'?<CgClose className="rejected"/>:<FiClock className="pending"/>}
                        </span>
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