const { Event } = require('../models/eventModel')
const User = require('../models/userModel')
const { addEvent, removeEvent } = require('./userController')
const mongoose = require('mongoose')
const Venue = require('../models/venueModel')
const { addBooking, deleteBooking } = require('./venueController')

// create event
const createEvent = async (req, res) => {
    const { title, description, startTime, endTime, venues, email } = req.body;
    // console.log(email)
    let user = await User.find({ email }).populate('facultyMentor')
    console.log(...user)
    // console.log(user[0]._id.valueOf())


    try {
        const event = await Event.create({
            title,
            description,
            startTime,
            endTime,
            user: user[0]._id.toString(),
            venues,
        })
        // console.log('event created')

        user = await addEvent(event._id, user[0]._id.toString(), user[0].facultyMentor._id)
        // console.log(user)
        // console.log(venues)

        venues.forEach(async (venue) => {
            venue = venue.toString()
            // console.log(venue)
            await addBooking(event._id, venue, startTime, endTime)
        })

        if (event) res.status(200).json(req.body)

    }
    catch (error) {
        return res.status(400).json({ error })
    }
}

// get all events
const getAllEvents = async (req, res) => {

    try {
        const status = req.query.status
        // console.log(req.query)
        const response = Object.keys(req.query).length !== 0 ? await Event.find({ status }).populate('user') : await Event.find({}).populate('user')
        // console.log(response)
        // const resp = response.map(e=>e.populate('user'))

        res.status(200).json(response)

    }
    catch (error) {
        return res.status(400).json({ error })
    }
}

//get one event 
const getEvent = async (req, res) => {
    const { _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: 'No such Event' })
    }
    const response = await Event.findById(_id).populate('venues');

    if (!response) {
        return res.status(400).json({ error: 'No such Event' })
    }

    res.status(200).json(response)
}

// updating event
const updateEvent = async (req, res) => {
    // console.log(req.body)
    const { _id } = req.params
    const { title, description, startTime, endTime, newVenues, changedVenues } = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'No such Event' })
    }
    // const event = await Event.findOneAndUpdate({_id},{
    //     title,description,startTime,endTime
    // });
    const event = await Event.findById(_id)
    if (!event) {
        return res.status(400).json({ error: 'No such Event' })
    }
    event.venues = [...newVenues, ...changedVenues.filter(e => (e.checked == true))]
    await event.save()
    // console.log(event.venues)
    let venues = await Venue.find({ _id: { $in: changedVenues } })
    console.log(venues)
    venues?.forEach(async (venue, i) => {
        if (!changedVenues[i].checked) {
           await deleteBooking(_id, venue).then(console.log('deleted'))
        }
        else {
            let bookings = [];
            venue.bookings.forEach(booking => {
                if (booking.event.toString() === _id) {
                    bookings.push({
                        event:_id, startTime, endTime
                    })
                }
                else bookings.push(booking)
            })
            venue.bookings = bookings
            await venue.save().then(console.log('booking changed'))
        }


    })

    console.log(newVenues)
    venues = await Venue.find({ _id: { $in: newVenues } })
    venues.forEach(async (venue)=>{
        let booking = {
            event:_id,
            startTime,
            endTime
        }
        venue.bookings = [...venue.bookings,booking]
        await venue.save().then('new booking added')
    })
    // console.log(response)
    res.status(200).json(event)
}

// deleting event
const deleteEvent = async (req, res) => {
    const { _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'No such Event' })
    }
    const event = await Event.findByIdAndDelete(_id);
    if (!event) {
        return res.status(400).json({ error: 'No such Event' })
    }
    let user = await User.findById(event.user)
    const permissions = event.statusBar
    const venues = event.venues;
    console.log(event.venues)
    user.events = user.events.filter((e) => {
        return e._id.toString() !== _id
    })
    await user.save().then(console.log('Event removed from user'))

    permissions.forEach(async (perm) => {
        let authority = await Venue.findById(perm.authority)
        authority.permissions = authority.permissions.filter((e) => {
            return e._id.toString() !== _id
        })
        await authority.save().then(console.log('Event removed from faculty'))
    })

    venues.forEach(async (e) => {
        e = e.toString()
        // console.log(e)
        let venue = await Venue.findById(e)
        venue.bookings = venue.bookings.filter((booking) => {
            return (booking.event.toString() !== _id)
        })
        await venue.save().then(console.log('Booking deleted'))
    })

    res.status(200).json(event)
}

const populatePermissions = async (eventId, userId) => {
    let perms = [];
    perms.push('') // GS
    const event = await Event.findById(eventId).populate('venues');
    const user = await User.findById(userId);
    if (user.facultyMentor) perms.push(user.facultyMentor)
    perms.push('') // Talele Sir
    if (event.venues !== []) {
        event.venues.forEach((e) => {
            if (!perms.find(e.faculty)) perms.push(e.faculty)
        })
    }

    user.statusBar = perms;
    await user.save().then(console.log(perms))
        .catch(error => { throw new Error(error) })
}

const updateStatusBar = async (req, res) => {

}

module.exports = {
    createEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    // getEventsStatus
}