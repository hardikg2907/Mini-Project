import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import Modal from "react-overlays/Modal";
import { useAuthContext } from '../context/AuthContext';
import moment from 'moment';
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';
import {GrClose} from 'react-icons/gr';

export const EventDetail = ({isAllEvents}) => {

    const { selectedEvent, setShowModal, showModal } = useEventContext()
    const [disableBtn, setDisableBtn] =useState(false);
    const [commentPanel, setCommentPanel]=useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [clickedOption, setClickedOption]=useState('');
    // console.log(selectedEvent);
    // console.log(new Date().getTime())
    // const [changeStatus, setChangeStatus] = useState('pending')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const renderBackdrop = (props) => <div className="backdrop" {...props} />;
    var handleClose = () => setShowModal(false);

    const [optionName,setOptionName]=useState('');
    const confirmClickHander=(status)=>{
        switch (status) {
            case "delete": setOptionName("Delete");
                break;
            case "rejected": setOptionName("Reject");
                break;
            case "approved": setOptionName("Approve");
                break;
            case "Waiting for resubmission": setOptionName("Re-Submit");
                break;
            default:
                break;
        }
        setClickedOption(status);
        setCommentPanel(true);
    }

    const handleClick = async (status) => {
        console.log(status)
        if(status==='delete') deleteEvent();
        if(status==='approved' || status==='rejected') setDisableBtn(true);
        let response = await axios({
            url: `/api/event/status/${selectedEvent._id}`,
            method: 'patch',
            headers: { 'Content-type': 'application/json' },
            data: { status,email: user.email,eventId:selectedEvent._id }
        })
        // console.log(response)
        // setShowModal(false)
        // setCommentPanel(false);
        // navigate('/');
        // console.log(response)
        response = await axios({
            url: `/api/event/comment`,
            method: 'post',
            data: {
                eventId: selectedEvent._id,
                email: user.email,
                content: commentContent
            },
            headers: { 'Content-type': 'application/json' }
        })
        console.log(response.data);
    }

    const deleteEvent = async (e) => {
        e.preventDefault();

        // console.log(selectedEvent._id)
        const response = await axios({
            url: `/api/event/${selectedEvent._id}`, 
            method: 'delete',
            headers: { 'Content-type': 'application/json' }
        })
        // console.log(response.data)
        setShowModal(false)
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
                    <img src="https://img.collegepravesh.com/2018/11/SPIT-Mumbai-Logo.png"  height="40rem"   alt="logo" className="logo"/>
                    <div className="com"><h1 className='commName'>{selectedEvent.user.name}</h1></div>
                    </div>
                    <div className='eventDetail'><h2>Event Name: </h2><p>{selectedEvent.title}</p></div>
                    <div className='eventDetail'><h2>Date: </h2><p>{moment(selectedEvent.startTime).format('LLL')} - {moment(selectedEvent.endTime).format('LLL')}</p></div>
                    {/* <br/> */}
                    <div className='eventDetail'><h2>Description: </h2><p>{selectedEvent.description}</p></div>
                    <div className='eventDetail'><h2>Venues: </h2><p>{selectedEvent.venues.length==0 ?"N/A":selectedEvent.venues.map(venue => `${venue.name},`)}</p></div>
                    <div className="eventDetail">
                            <h2>Contact Person: </h2><p>Committee Coordinator (9819211564)</p>
                    </div>
                    {user.type == 'Faculty' && !commentPanel && !isAllEvents && (new Date(selectedEvent.endTime).getTime()>new Date().getTime() ? (
                        <div className="modal-footer">
                            <button className={disableBtn?'disabled-button':'reject-button'} onClick={() => confirmClickHander('rejected')} disabled={disableBtn}>
                                Reject
                            </button>
                            <button className={disableBtn?'disabled-button':'resub-button'} onClick={() => confirmClickHander('Waiting for resubmission')} disabled={disableBtn}>
                                Re-Submit
                            </button>
                            <button className={disableBtn?'disabled-button':'approve-button'} onClick={() => confirmClickHander('approved')} disabled={disableBtn}>
                                Approve
                            </button>
                        </div>) : selectedEvent.status == 'approved' ? (<div className='modal-footer'>Event Over</div>) : (<div className='modal-footer'>Event didnt happen</div>)
                    )}
                    {user.type == 'Committee' && !commentPanel && !isAllEvents &&
                    (new Date(selectedEvent.endTime).getTime()>new Date().getTime() ? (
                        <div className="modal-footer">
                            <button className="reject-button" onClick={()=>{confirmClickHander('delete')}}>
                                Delete
                            </button>
                            <Link to={{ pathname: `/edit/${selectedEvent._id}` }}>
                                <button className="approve-button">Edit</button>
                            </Link>

                        </div>
                        ) : selectedEvent.status == 'approved' ? (<div className='modal-footer'>Event Over</div>) : (<div className='modal-footer'>Event didnt happen</div>))
                    }
                    {commentPanel &&
                        <div className='comment-footer'>
                            <form className="form-container">
                                <label>Add a Comment</label>
                                <textarea style={{height: "2rem", width:"46rem"}} required={optionName!="Approve"} onChange={(e)=>setCommentContent(e.currentTarget.value)}/>
                            </form>
                            <div className='commentOptions'>
                                <button className="cancelBtn" onClick={()=>setCommentPanel(false)}>
                                    Cancel
                                </button>
                                <button className='confirmBtn' onClick={()=>handleClick(clickedOption)}>
                                    Confirm {optionName}
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </Modal>
        </aside>
    );
}