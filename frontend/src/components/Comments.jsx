import React, { useState } from 'react'
import { useEventContext } from '../context/EventContext';
import moment from 'moment';
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext';

const Comments = ({ comments, setCommentsSection }) => {

    const { selectedEvent } = useEventContext();
    const [comment, setComment] = useState("")
    const { user } = useAuthContext()
    const addComment = async () => {
        if (comment !== "") {
            let response = await axios({
                url: `/api/event/comment`,
                method: 'post',
                data: {
                    eventId: selectedEvent._id,
                    email: user.email,
                    content: comment
                },
                headers: { 'Content-type': 'application/json' }
            })
            console.log(response.data);
        }
        setCommentsSection(false)
    }

    return (
        <div>
            {comments.map(e => {
                return <div className='comments' style={{ lineHeight: "0.6em" }}>
                    <h5 style={{ marginLeft: "0.5rem" }}>{e.user.name}</h5>
                    <p style={{ marginLeft: "0.5rem" }}>{e.content}</p>
                    <p style={{ position: "relative", left: "610px" }}>{moment(e.createdAt).format('LLL')}</p>
                    <hr />
                </div>
            })}

            <div style={{ display: "grid", gridTemplateColumns: "100fr 1fr", marginBottom: "5px", marginTop: "5px" }}><textarea style={{ height: "2rem", width: "35rem", marginLeft: "1rem", display: "flex", alignSelf: "center" }} onChange={(e) => { setComment(e.currentTarget.value) }} />
                <button className='approve-button' style={{ width: "10.5rem", marginRight: "1rem", backgroundColor: "var(--box-color)" }} onClick={() => { addComment() }}>Add Comment</button></div>
        </div>
    )
}

export default Comments;