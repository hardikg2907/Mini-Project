import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useEventContext } from "../context/EventContext"
import { useAuthContext } from "../context/AuthContext"
import Select from "react-select"
import PrevVenue from "../components/PrevVenue"
import * as moment from "moment-timezone"

const EditForm = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [displayVenues, setDisplayVenues] = useState([])
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { selectedEvent, setSelectedEvent, handleChange, venues } = useEventContext()
    const { id } = useParams()

    useEffect(() => {
        const fetchSelectedEvent = async () => {
            console.log(id)

            const response = await axios(`/api/event/${id}`)
            // console.log(response)
            const data = await response.data
            await setSelectedEvent(data)
            console.log(selectedEvent)

            setTitle(data.title)
            setDescription(data.description)
            setStartTime(moment.tz(data.startTime, "Asia/Kolkata").format().slice(0, -6))
            // console.log(moment.tz(data.startTime, "Asia/Kolkata").format().slice(0,-6))
            // console.log(new Date(data.startTime).toLocaleString("en-GB", {timeZone: "Asia/Kolkata"}))
            setEndTime(moment.tz(data.endTime, "Asia/Kolkata").format().slice(0, -6))
            // setDisplayVenues(data.venues.map((e)=>{
            //     return {
            //         value: e._id,
            //         label: e.name
            //     }
            // }))
            // console.log(displayVenues)
        }
        fetchSelectedEvent()
    }, [])

    useEffect(() => {

        const fetchData = async () => {
            if (startTime > endTime) return;
            console.log(startTime)
            const response = await axios(`/api/venues?startTime=${new Date(startTime).getTime()}&endTime=${new Date(endTime).getTime()}`)
            const data = response.data

            console.log(data)

            setDisplayVenues(data.map((e) => {
                return {
                    value: e._id,
                    label: e.name
                }
            }))

        }
        fetchData()

    }, [startTime, endTime])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(
            '/api/events', {
            method: 'PATCH',
            body: JSON.stringify({
                title,
                description,
                startTime,
                endTime,
                venues,
                email: user.email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async response => {
                const json = await response.json()
                console.log(json)
            })
            .catch(error => console.log(error))

        navigate('/permissions')

    }

    return (
        <div className="permForm">
            <div className="permHeader"><h2>Permissions Form</h2></div>
            <form className="mainForm" onSubmit={handleSubmit}>
                <div className="form-container">
                    <label>Title</label>
                    <input type="text" onChange={(e) => { setTitle(e.currentTarget.value) }} required value={title} />
                </div>
                <div className="form-container">
                    <label>Description</label>
                    <textarea style={{ height: "10rem" }} onChange={(e) => { setDescription(e.currentTarget.value) }} required value={description} />
                </div>
                <div className="dateTime">
                    <div className="form-container fc1">
                        <label>Start Date & Time</label>
                        <input type="datetime-local" onChange={(e) => { setStartTime(e.currentTarget.value); }} required value={startTime} />
                    </div>
                    <div className="form-container fc2">
                        <label>End Date & Time</label>
                        <input type="datetime-local" onChange={(e) => { setEndTime(e.currentTarget.value) }} required value={endTime} />
                    </div>
                </div>
                <div className="form-container">
                    <label>Previous Venues</label>
                    <div className="prev-venues-container">
                        {selectedEvent?.venues &&
                            selectedEvent?.venues.map((e) => {
                                return <PrevVenue venue={e} key={e._id}/>
                            })
                        }
                    </div>


                    <label>New Venues</label>
                    <Select
                        isMulti
                        name="colors"
                        options={displayVenues}
                        className="basic-multi-select venues-select"
                        classNamePrefix="select"
                        closeMenuOnSelect={false}
                        onChange={handleChange} />
                </div>
                <div className="submit-box">
                    <button type="submit" className="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditForm