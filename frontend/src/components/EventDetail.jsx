import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import Modal from "react-overlays/Modal";
import { useAuthContext } from '../context/AuthContext';
import moment from 'moment';
import axios from 'axios';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import {GrClose} from 'react-icons/gr';
import { PermissionForm } from '../pages/permissions/PermissionForm';

export const EventDetail = () => {

    const { selectedEvent, setShowModal, showModal } = useEventContext()
    const [disableBtn, setDisableBtn] =useState(false);
    console.log(selectedEvent);
    // console.log(new Date().getTime())
    // const [changeStatus, setChangeStatus] = useState('pending')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const renderBackdrop = (props) => <div className="backdrop" {...props} />;
    var handleClose = () => setShowModal(false);

    const handleClick = async (status) => {
        console.log(status)
        if(status==='approved' || status==='rejected') setDisableBtn(true);
        const response = await axios({
            url: `/api/event/status/${selectedEvent._id}`,
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            data: { status,email: user.email,eventId:selectedEvent._id }
        })
        console.log(response)
        handleClose();
        navigate('/');
    }

    const deleteEvent = async (e) => {
        e.preventDefault();

        // console.log(selectedEvent._id)
        const response = await axios({
            url: `/api/event/${selectedEvent._id}`, 
            method: 'delete',
            headers: { 'Content-type': 'application/json' }
        })
        console.log(response.data)
        navigate('/')
    }

    return (
        <aside className='model-overlay'>
            <Modal
                className="modal"
                show={showModal}
                onHide={handleClose}
                renderBackdrop={renderBackdrop}>
                <div className='modal-container'>
                    <div className="close-button" onClick={handleClose}>
                        <GrClose/>
                    </div>
                    <div className='eventDetail-com'>
                    <img src="https://img.collegepravesh.com/2018/11/SPIT-Mumbai-Logo.png"  height="40rem"   alt="logo" class="logo"/>
                    <div className="com"><h1 className='commName'>{selectedEvent.user.title}</h1></div>
                    </div>
                    <div className='eventDetail'><h2>Event Name: </h2><p className='content'>{selectedEvent.title}</p></div>
                    <div className='eventDetail'><h2>Date: </h2><p>{moment(selectedEvent.startTime).format('LLL')} - {moment(selectedEvent.endTime).format('LLL')}</p></div>
                    {/* <br/> */}
                    <div className='eventDetail'><h2>Description: </h2><p>{selectedEvent.description}</p></div>
                    <div className='eventDetail'><h2>Venues: </h2><p>{selectedEvent.venues.map(venue => `${venue.name},`)}</p></div>
                    <div className="eventDetail">
                            <h2>Contact Person: </h2><p>Committee Coordinator (9819211564)</p>
                    </div>
                    {user.type == 'Faculty' && (new Date(selectedEvent.endTime).getTime()>new Date().getTime() ? (
                        <div className="modal-footer">
                            <button className={disableBtn?'disabled-button':'reject-button'} onClick={() => handleClick('rejected')} disabled={disableBtn}>
                                Reject
                            </button>
                            <button className={disableBtn?'disabled-button':'resub-button'} onClick={() => handleClick('Waiting for resubmission')} disabled={disableBtn}>
                                Re-Submit
                            </button>
                            <button className={disableBtn?'disabled-button':'approve-button'} onClick={() => handleClick('approved')} disabled={disableBtn}>
                                Approve
                            </button>
                        </div>) : selectedEvent.status == 'approved' ? (<div className='modal-footer'>Event Over</div>) : (<div className='modal-footer'>Event didnt happen</div>)
                    )}
                    {user.type == 'Committee' && 
                    // (new Date(selectedEvent.endTime).getTime()>new Date().getTime() ? (
                        <div className="modal-footer">
                            <button className="reject-button" onClick={deleteEvent}>
                                Delete
                            </button>
                            <Link to={{ pathname: `/edit/${selectedEvent._id}` }}>
                                <button className="approve-button">Edit</button>
                            </Link>

                        </div>
                        // ) : selectedEvent.status == 'approved' ? (<div className='modal-footer'>Event Over</div>) : (<div className='modal-footer'>Event didnt happen</div>))
                    }
                </div>
            </Modal>
        </aside>
    );
}