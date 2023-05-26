import { PermissionsTable } from "../components/PermissionsTable";
import { useEventContext } from "../context/EventContext";
import { EventDetail } from "../components/EventDetail";
// import {Calendar} from "../components/Calendar";
import React, { useEffect, useState } from 'react';
import moment from 'moment'

const AllEvents = () => {

    const { setAllEvents, allEvents, showModal, setShowModal, setSelectedEvent } = useEventContext()
    const [events, setEvents] = useState([])

    useEffect(() => {
        setEvents(allEvents.filter((event) => event.status == 'approved').sort((a,b)=>new Date(b.endTime).getTime()-new Date(a.endTime).getTime()))
        console.log(events)
    }, [])

    const selectEvent = (event) => {
        setSelectedEvent(event)
        setShowModal(true)
    }

    return (
        <div className='pageHeader'>
            <div className="permHeader"><h2>All Events</h2></div>
            {/* <PermissionsTable events={allEvents.filter((event)=>event.status=='approved')}/> */}
            <div className="table">
                <div className="headings eventHeading">
                    <div className="hehe">Committee</div>
                    <div className="hehe">Event Name</div>
                    <div className="hehe">Date</div>
                    <div className="hehe">Time</div>
                </div>
                <div className='content-container'>
                    {events
                        .map((event) => {
                            return (
                                <div className='content eventContent' key={event._id} onClick={() => selectEvent(event)}>
                                    <div className="hehe">{event.user.name}</div>
                                    <div className="hehe">{event.title}</div>
                                    <div className="hehe">{moment(event.startTime).format('LL')}</div>
                                    <div className="hehe">{moment(event.startTime).format('LT')}-{moment(event.endTime).format('LT')}</div>
                                </div>)
                        })}
                </div>
            </div>
            {showModal && <EventDetail allEvents={true} />}
            {/* <div className="calendar">
                <Calendar events={events} />
            </div> */}
        </div>
    );
}

export default AllEvents