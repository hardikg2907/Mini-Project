const { Event } = require('../models/eventModel')
const User = require('../models/userModel')
const { addEvent, removeEvent } = require('./userController')
const mongoose = require('mongoose')
const Venue = require('../models/venueModel')
const { addBooking, deleteBooking } = require('./venueController')
const {sendCommMail,sendFacultyMail} = require('./mail')

// create event
const createEvent = async (req, res) => {
    const { title, description, startTime, endTime, venues, email } = req.body;
    let user = await User.find({ email })
    // console.log(...user)
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

        await addEvent(event._id, user[0]._id.toString())
        // console.log(user)
        // console.log(venues)
        for (let venue of venues) {
            venue = venue.toString()
            // console.log(venue)
            await addBooking(event._id, venue, startTime, endTime)
        }
        console.log('entering');
        populatePermissions(event._id,user[0]._id.toString())

        if (event) res.status(200).json(req.body)

    }
    catch (error) {
        return res.status(400).json({ error: 'Error' })
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
    event.venues = [...newVenues, ...changedVenues?.filter(e => (e.checked == true))]
    await event.save()
    // console.log(event.venues)
    let venues = await Venue.find({ _id: { $in: changedVenues } })
    console.log(venues)
    venues.forEach(async (venue, i) => {
        if (!changedVenues[i].checked) {
            await deleteBooking(_id, venue).then(console.log('deleted'))
        }
        else {
            let bookings = [];
            venue.bookings.forEach(booking => {
                if (booking.event.toString() === _id) {
                    bookings.push({
                        event: _id, startTime, endTime
                    })
                }
                else bookings.push(booking)
            })
            venue.bookings = bookings
            await venue.save().then(console.log(bookings))
        }


    })

    console.log(newVenues)
    venues = await Venue.find({ _id: { $in: newVenues } })
    venues.forEach(async (venue) => {
        let booking = {
            event: _id,
            startTime,
            endTime
        }
        venue.bookings = [...venue.bookings, booking]
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

    for(let perm of permissions)
    {
        let authority = await Venue.findById(perm.authority)
        if(authority==null) break;
        authority.permissions = authority?.permissions.filter((e) => {
            return e._id.toString() !== _id
        })
        await authority.save().then(console.log('Event removed from faculty'))
    }

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
    console.log('entered')
    let perms = [];
    // console.log(perms)
    perms.push('64455b6d10122557a1a1fd32') // GS
    const event = await Event.findById(eventId).populate('venues');
    let facEmail = await User.findById(perms[0])
    const user = await User.findById(userId);
    console.log(facEmail)
    facEmail = facEmail.email
        
    await sendFacultyMail(facEmail,user.title,event.title)

    console.log(perms)
    await User.updateOne({ _id: perms[0] }, { $push: { permissions: eventId } })
    if (user.facultyMentor){
        perms.push(user.facultyMentor.toString())
        await User.updateOne({ _id: user.facultyMentor.toString() }, { $push: { permissions: eventId } })
        facEmail = await User.findById(perms[1])
        facEmail=facEmail.email
        
        await sendFacultyMail(facEmail,user.title,event.title)
    }
    perms.push('64455bc9c5d851de3821a06f') // Talele Sir
    if (event.venues !== []) {
        event.venues.forEach((e) => {
            console.log(e.faculty.toString())
            if (perms.indexOf(e.faculty.toString())==-1) perms.push(e.faculty.toString())
        })
    }
    console.log(perms)

    event.statusBar = perms.map(perm=>{return {
        authority: perm,
        status: 'pending'
    }});
    await event.save().then(console.log(perms))
        .catch(error => { throw new Error(error) })
}

const updateStatusBar = async (req, res) => {
    const {status,email,eventId} = req.body;
    let fac = await User.find({email})
    // console.log(status, email)
    const event = await Event.findById(eventId).populate('user')
    console.log(event.user.email)
    fac = fac[0]
    let facId = fac._id.toString()
    event.statusBar = event.statusBar.map(e=>{
        if(e.authority.toString()===facId){
            e.status=status
            return e
        }
        else 
        {
            return e
        }
    })
    await event.save()
    if(status=='rejected'){
        event.status='rejected';
        await sendCommMail(event.user.email,event.title,'rejected')
        await event.save()
        return;
    }

    let i=0
    let flag =0
    while(true)
    {   
        console.log(i)
        if (i==event.statusBar.length){flag=1;break;}
        if(event.statusBar[i].status!='approved') {break;}
        i++;
    }
    if(flag==0)
    {
        if(event.statusBar[i-1].status=='approved' && i-1>1)
        {   
            await User.updateOne({ _id: event.statusBar[i].authority.toString() }, { $push: { permissions: eventId } })
            let facEmail = await User.findById(event.statusBar[i].authority.toString())
            facEmail=facEmail.email
        
            await sendFacultyMail(facEmail,event.user.title,event.title)
        }
        else if(event.statusBar[0].status=='approved' && event.statusBar[1].status=='approved')
        {
            await User.updateOne({ _id: event.statusBar[2].authority.toString() }, { $push: { permissions: eventId } })
            let facEmail = await User.findById(event.statusBar[2].authority.toString())
            facEmail=facEmail.email
        
            await sendFacultyMail(facEmail,event.user.title,event.title)
        }
    }
    else if(event.statusBar[i-1].status=='approved'){
        console.log('hi')
        event.status='approved'
        await sendCommMail(event.user.email,event.title,'approved')
        await event.save();
    }
}

module.exports = {
    createEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    updateStatusBar
    // getEventsStatus
}