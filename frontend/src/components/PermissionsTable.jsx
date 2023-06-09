import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import { useEventContext } from '../context/EventContext';
import { useAuthContext } from '../context/AuthContext';
import { ProgressBar } from './ProgressBar';

export const PermissionsTable = ({events}) => {
    const [status, setStatus]=useState('all');
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const {setShowModal,setSelectedEvent} = useEventContext()
    // console.log(events);
    useEffect(()=>{
        // setSelectedEvent(null)
    },[])

    const selectEvent = (event) =>
    {   
        setSelectedEvent(event)
        console.log(event)
        setShowModal(true)
    }

    return(
        <div className="table">
            <div className="titles">
                <div className={(status=='all'?"tit under":"tit")} onClick={()=>{setStatus('all')}}>All</div>
                <div className={status=='pending'?"tit under":"tit"} onClick={()=>{setStatus('pending')}}>Pending</div>
                <div className={status=='approved'?"tit under":"tit"} onClick={()=>{setStatus('approved')}}>Approved</div>
                <div className={status=='rejected'?"tit under":"tit"} onClick={()=>{setStatus('rejected')}}>Rejected</div>
            </div>
            {user.type=='Faculty' &&
                <div className="headings">
                    <div className="hehe">Committee</div>
                    <div className="hehe">Event Name</div>
                    <div className="hehe">Date</div>
                    <div className="hehe">Progress</div>
                    <div className="hehe">Status</div>
                </div>
            }
            {user.type == 'Committee' &&
                <div className="headings commHeading">
                    <div className="hehe">Event Name</div>
                    <div className="hehe">Date</div>
                    <div className="hehe">Progress</div>
                    <div className="hehe">Status</div>
                </div>
            }
            {user.type=='Faculty' && 
                <div className='content-container'>
                    {events?.filter((event)=> status!='all'?event.status==status:true)
                    .map((event)=>{
                        return (
                        <div className='content' key={event._id} onClick={()=>selectEvent(event)}>
                            <div className="hehe">{event.user.name}</div>
                            <div className="hehe">{event.title}</div>
                            <div className="hehe">{moment(event.startTime).format('LL')}</div>
                            <div className="hehe"><ProgressBar event={event}/></div>
                            <div className="hehe">{event.status}</div>
                        </div>)
                    })}
                </div>
            }
            {user.type=='Committee' && 
                <div className='content-container'>
                    {events?.filter((event)=> status!='all'?event.status==status:true)
                    .map((event)=>{
                        return (
                        <div className='content commContent' key={event._id} onClick={()=>selectEvent(event)}>
                            <div className="hehe">{event.title}</div>
                            <div className="hehe">{moment(event.startTime).format('LL')}</div>
                            <div className="hehe"><ProgressBar event={event}/></div>
                            <div className="hehe">{event.status}</div>
                        </div>)
                    })}
                </div>
            }
        </div>
    );
}