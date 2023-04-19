const {Event} = require('../models/eventModel')
const User = require('../models/userModel')
const {addEvent, removeEvent} = require('./userController')
const mongoose = require('mongoose')
const {addBooking, deleteBooking} = require('./venueController')

// create event
const createEvent = async (req,res) => {
    const {title, description, startTime, endTime, venues,status, email} = req.body;
    // console.log(email)
    let user = await User.find({email}).populate('facultyMentor')
    console.log(...user)
    // console.log(user[0]._id.valueOf())


    try{
        const event = await Event.create({
            title,
            description,
            startTime,
            endTime,
            user: user[0]._id.toString(),
            venues,
        })
        // console.log('event created')
 
        user = await addEvent(event._id,user[0]._id.toString(),user[0].facultyMentor._id)
        // console.log(user)
        // console.log(venues)
        
        venues.forEach(async (venue)=>{ venue = venue.toString()
            // console.log(venue)
            await addBooking(event._id,venue,startTime,endTime)})

        if(event) res.status(200).json(req.body)

    }
    catch(error)
    {
        return res.status(400).json({error})
    }
}

// get all events
const getAllEvents = async (req,res) => {
    
    try{
        const status = req.query.status
        // console.log(req.query)
        const response = Object.keys(req.query).length !== 0 ? await Event.find({status}).populate('user'):await Event.find({}).populate('user')
        // console.log(response)
        // const resp = response.map(e=>e.populate('user'))
        
        res.status(200).json(response)

    }
    catch(error)
    {
        return res.status(400).json({error})
    }
}

//get one event 
const getEvent = async (req,res) => {
    const {_id} = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({error: 'No such Event'})
    }
    const response = await Event.findById(_id);

    if(!response) {
        return res.status(400).json({error: 'No such Event'})
    }
    
    res.status(200).json(response)
}

// updating event
const updateEvent = async (req,res) => {
    const {_id} = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({error: 'No such Event'})
    }
    // console.log(req.body)
    const response = await Event.findOneAndUpdate({_id},{
        ...req.body
    });

    if(!response) {
        return res.status(400).json({error: 'No such Event'})
    }
    // console.log(response)
    res.status(200).json(response)
}

// deleting event
const deleteEvent = async (req,res) => {
    const {_id} = req.params
    // let user = await User.find({email})

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({error: 'No such Event'})
    }
    const venues = await Event.findById(_id).venues;
    console.log(venues)
    const response = await Event.findByIdAndDelete(_id);
    if(!response) {
        return res.status(400).json({error: 'No such Event'})
    }

    // user = removeEvent(_id,user[0]._id.toString())

    // venues.forEach(async (venue)=>{ venue = venue.toString()
    //     // console.log(venue)
    //     await deleteBooking(_id,venue)})

    res.status(200).json(response)
}

const populatePermissions = async ()=> {

}

const changeStatusBar = async (req,res) => {

}

module.exports = {
    createEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    // getEventsStatus
}