import React from 'react';
import { useEventContext } from '../context/EventContext';
import Modal from "react-overlays/Modal";

export const EventDetail=()=>{

    const {selectedEvent,setShowModal, showModal} = useEventContext()

    const renderBackdrop = (props) => <div className="backdrop" {...props} />;
    var handleClose = () => setShowModal(false);
    var handleSuccess = () => {
        console.log("success");
    };

    return(
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
                        <div><h2>Committee: CSI</h2></div>
                        <div><h2>{selectedEvent.title}</h2></div>
                        <div><h3>Date: April 15, 2023</h3></div>
                        <br/>
                        <div><p>Summary: Details...Loda Lassun</p></div>
                        <div><p>Rooms: 469</p></div>
                        <br/>
                        <div className="modal-footer">
                            <button className="secondary-button" onClick={handleClose}>
                                Close
                            </button>
                            <button className="primary-button" onClick={handleSuccess}>
                              Save Changes
                            </button>
                        </div>
                    </div>
                </Modal>
        </aside>
    );
}