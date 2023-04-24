import { useEffect, useState } from "react"
import { useNavigate} from 'react-router-dom'
import axios from "axios"
import Select from 'react-select'
import { useAuthContext } from "../../context/AuthContext"
import { useEventContext } from "../../context/EventContext"


export const PermissionForm = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [displayVenues, setDisplayVenues] = useState([])
    const navigate = useNavigate()
    const {user} = useAuthContext()
    const {venues,handleChange} = useEventContext()


    useEffect(() => {

        const fetchData = async () => {
            if(startTime>endTime) return;
            const response = await axios(`/api/venues?startTime=${new Date(startTime).getTime()}&endTime=${new Date(endTime).getTime()}`)
            const data = response.data

            console.log(data)

            setDisplayVenues(data.map((e)=>{
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
        console.log(venues)

        const response = await axios(
            {
            url: '/api/events',
            method: 'post',
            data: {
                title,
                description,
                startTime,
                endTime,
                venues,
                email: user.email
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async response => {
                const data = await response.data
                console.log(data)
            })
            // .catch(error => console.log(error))

        navigate('/permissions')

    }


    return (
        <div className="permForm">
            <div className="permHeader"><h2>Permissions Form</h2></div>
            <form className="mainForm" onSubmit={handleSubmit}>
                <div className="form-container">
                    <label>Title</label>
                    <input type="text" onChange={(e) => { setTitle(e.currentTarget.value) }} required/>
                </div>
                <div className="form-container">
                    <label>Description</label>
                    <textarea style={{height: "10rem" }} onChange={(e) => { setDescription(e.currentTarget.value) }} required />
                </div>
                <div className="dateTime">
                    <div className="form-container fc1">
                    <label>Start Date & Time</label>
                    <input type="datetime-local" onChange={(e) => { setStartTime(e.currentTarget.value); }} required/>
                    </div>
                    <div className="form-container fc2">
                    <label>End Date & Time</label>
                    <input type="datetime-local" onChange={(e) => { setEndTime(e.currentTarget.value) }} required/>
                    </div>
                </div>
                <div className="form-container">
                    <label>Venues</label>
                    <Select
                        isMulti
                        name="colors"
                        options={displayVenues}
                        className="basic-multi-select venues-select"
                        classNamePrefix="select"
                        closeMenuOnSelect={false} 
                        onChange={handleChange}/>
                </div>
                <div className="submit-box permSubmitBox">
                    <button className="submit permSubmit" onClick={()=>{navigate('/permissions')}}>Cancel</button>
                    <button type="submit" className="submit permSubmit">Submit</button>
                </div>
            </form>
        </div>
    );
}