import React from 'react'
import { useEventContext } from '../context/EventContext';

const Comments = () => {

    const {selectedEvent} = useEventContext()

    return (
        <div>
            {JSON.stringify(selectedEvent.comments)}
        </div>
    )
}

export default Comments;