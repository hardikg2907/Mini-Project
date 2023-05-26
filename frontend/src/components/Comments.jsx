import React from 'react'
import { useEventContext } from '../context/EventContext';

const Comments = ({comments}) => {

    const {selectedEvent} = useEventContext()

    return (
        <div>
            {comments.map(e=>{
                return <div className='comments'>
                    <h5>{e?.user?.name}</h5>
                    <p>{e.content}</p></div>
            })}
        </div>
    )
}

export default Comments;