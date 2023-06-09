const Venue = require('../models/venueModel')
const Moment = require('moment');
const MomentRange = require('moment-range');
 
const moment = MomentRange.extendMoment(Moment);

const getVenues = async (req, res) => {
    let { startTime, endTime, includeEvent } = req.query
    // console.log(req.query)
    startTime = new Date(parseInt(startTime))
    endTime = new Date(parseInt(endTime))
    // console.log(startTime,endTime)

    try {
        let response = await Venue.find({})
        let resp=[]
        // console.log(response)

        response.forEach((e)=>{
            if(e.bookings.length>0){
                e.bookings.forEach(element=>{
                const range1 = moment.range(startTime,endTime)
                const range2 = moment.range(new Date(element.startTime),new Date(element.endTime))
                // console.log(range1,range2)
                // console.log(range1.overlaps(range2))
                if(!(range1.overlaps(range2)) && resp.indexOf(e)==-1)
                resp.push(e)
                else if(range1.overlaps(range2))resp.pop(e)
            })
            }
            else resp.push(e)
        })
        // console.log(resp);
        res.status(200).json(resp)
    }
    catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const addBooking = async (eventId, venueId, startTime, endTime) => {
    try {
        const response = await Venue.updateOne({ _id: venueId }, { $push: { bookings: { startTime, endTime, event: eventId } } })
        console.log('booking added')

        // return response

        // return json(response)    
    }
    catch (error) {
        throw error
    }
}

const deleteBooking = async (eventId, venue) => {
    try {
        // const response = await Venue.updateOne({ _id: venueId }, { $pull: { bookings: { event: eventId } } })
        console.log(venue)
        venue.bookings = venue.bookings.filter(e=>e.event.toString()!==eventId)
        await venue.save()

        return venue.bookings

        // return json(response)    
    }
    catch (error) {
        throw error
    }
}
module.exports = { getVenues, addBooking, deleteBooking }