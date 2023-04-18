import React from 'react';
import { useEventContext } from '../context/EventContext';
import Modal from "react-overlays/Modal";
import { useAuthContext } from '../context/AuthContext';
import moment from 'moment';
import axios from 'axios';
import { useNavigate,Link,Routes, Route } from 'react-router-dom';
import { PermissionForm } from '../pages/permissions/PermissionForm';

export const EventDetail = () => {

    const { selectedEvent, setShowModal, showModal } = useEventContext()
    console.log(selectedEvent);
    // const [changeStatus, setChangeStatus] = useState('pending')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const renderBackdrop = (props) => <div className="backdrop" {...props} />;
    var handleClose = () => setShowModal(false);

    const handleClick = async (status) => {
        console.log(status)
        const response = await axios({
            url: `/api/event/${selectedEvent._id}`,
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            data: { status }
        })
        console.log(response)
        handleClose();
        navigate('/');
    }

    return (
        <aside className='model-overlay'>
            <Modal
                className="modal"
                show={showModal}
                onHide={handleClose}
                renderBackdrop={renderBackdrop}>
                <div className='modal-container'>
                    <span className="close-button" onClick={handleClose}>
                        x
                    </span>
                    <div className='eventDetail'><h1 className='commName'>{selectedEvent.user.title}</h1></div>
                    <div className='eventDetail'><h2>Event Name: </h2><p className='content'>{selectedEvent.title}</p></div>
                    <div className='eventDetail'><h2>Date: </h2><p>{moment(selectedEvent.startTime).format('LLL')} - {moment(selectedEvent.endTime).format('LLL')}</p></div>
                    {/* <br/> */}
                    <div className='eventDetail'><h2>Description: </h2><p>{selectedEvent.description}</p></div>
                    <div className='eventDetail'><h2>Venues: </h2><p>{selectedEvent.venues.map(venue => `${venue.name},`)}</p></div>
                    {user.type == 'Faculty' &&
                        <div className="modal-footer">
                            <button className="reject-button" onClick={() => handleClick('rejected')}>
                                Reject
                            </button>
                            <button className="resub-button" onClick={() => handleClick('Waiting for resubmission')}>
                                Re-Submit
                            </button>
                            <button className="approve-button" onClick={() => handleClick('approved')}>
                                Approve
                            </button>
                        </div>
                    }
                    {user.type == 'Committee' &&
                        <div className="modal-footer">
                            <button className="reject-button" onClick={handleClose}>
                                Delete
                            </button>
                                <Link to={{pathname:`/edit/${selectedEvent._id}`}}>
                                    <button className="approve-button">Edit</button>
                                </Link>
                        </div>
                    }
                </div>
            </Modal>
        </aside>
    );
}