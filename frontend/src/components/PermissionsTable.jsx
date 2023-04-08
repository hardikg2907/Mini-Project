import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const PermissionsTable = ({events}) => {
    const [status, setStatus]=useState('all');
    const navigate = useNavigate()
    // console.log(events);

    return(
        <div className="table">
            <div className="titles">
                <div className={(status=='all'?"tit under":"tit")} onClick={()=>{setStatus('all')}}>All</div>
                <div className={status=='pending'?"tit under":"tit"} onClick={()=>{setStatus('pending')}}>Pending</div>
                <div className={status=='accepted'?"tit under":"tit"} onClick={()=>{setStatus('accepted')}}>Accepted</div>
                <div className={status=='rejected'?"tit under":"tit"} onClick={()=>{setStatus('rejected')}}>Rejected</div>
            </div>
            <div className="headings">
                <div className="hehe">Committee</div>
                <div className="hehe">Event Name</div>
                <div className="hehe">Date</div>
                <div className="hehe">Status</div>
            </div>
            <div className='content-container'>
                {events.filter((event)=> status!='all'?event.status==status:true)
                .map((event)=>{
                    return (<div className='content' key={event._id}>
                        <div className="hehe">CSI</div>
                        <div className="hehe">{event.title}</div>
                        <div className="hehe">{event.startTime}</div>
                        <div className="hehe status">{event.status}</div>
                    </div>)
                })}
            </div>
        </div>
    );
}