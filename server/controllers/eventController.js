// const Assignment = mongoose.model('Assignment', { dueDate: Date });
// Assignment.findOne(function(err, doc) {
//   doc.dueDate.setMonth(3);
//   doc.save(callback); // THIS DOES NOT SAVE YOUR CHANGE

//   doc.markModified('dueDate');
//   doc.save(callback); // works
// });

const {Event} = require('../models/eventModel')
const mongoose = require('mongoose')

// create event
const createEvent = async (req,res) => {
    const {title, description, startTime, endTime, venues,status} = req.body;

    try{
        const event = await Event.create({
            title,
            description,
            startTime,
            endTime,
            venues,
            status,
            user: req.id
        })

        if(event) res.status(200).json(req.body)

    }
    catch(error)
    {
    return res.status(404).json({error})
    }
}

// get all events
const getAllEvents = async (req,res) => {
    
    try{
        const status = req.query.status
        // console.log(req.query)
        const response = Object.keys(req.query).length !== 0 ? await Event.find({status}):await Event.find({})
        
        res.status(200).json(response)

    }
    catch(error)
    {
        return res.status(404).json({error})
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
        return res.status(404).json({error: 'No such Event'})
    }
    
    res.status(200).json(response)
}

// get event according to status
const getEventsStatus = async(req,res) => {
    const status = req.query.status

    try{
        const response = await Event.find({status})
        
        res.status(200).json(response)
    }
    catch(error)
    {
        return res.status(404).json({error})
    }
}

// updating event
const updateEvent = async (req,res) => {
    const {_id} = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({error: 'No such Event'})
    }
    const response = await Event.findOneAndUpdate({_id},{
        ...req.body
    });

    if(!response) {
        return res.status(404).json({error: 'No such Event'})
    }
    
    res.status(200).json(response)
}

// deleting event
const deleteEvent = async (req,res) => {
    const {_id} = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({error: 'No such Event'})
    }
    const response = await Event.findByIdAndDelete(_id);

    if(!response) {
        return res.status(404).json({error: 'No such Event'})
    }
    
    res.status(200).json(response)
}

module.exports = {
    createEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    getEventsStatus
}