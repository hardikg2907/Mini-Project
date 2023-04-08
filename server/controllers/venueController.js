const Venue = require('../models/venueModel')
const Moment = require('moment');
const MomentRange = require('moment-range');
 
const moment = MomentRange.extendMoment(Moment);

const getVenues = async (req, res) => {
    let { startTime, endTime } = req.query
    // console.log(req.query)
    startTime = new Date(startTime).toISOString()
    endTime = new Date(endTime).toISOString()

    try {
        let response = await Venue.find({})
        let resp=[]

        // resp = response.filter((e) => {
        //     // let blocked = false
        //     e.bookings.forEach(element => {
        //         const range1 = moment.range(startTime,endTime)
        //         const range2 = moment.range(element.startTime,element.endTime)
        //         console.log(range1,range2)
        //         // if(range1.overlaps(range2))
        //         //     blocked = true
        //         console.log(range1.overlaps(range2))
        //         return !(range1.overlaps(range2))
        //     })
        // })
        response.forEach((e)=>{
            e.bookings.forEach(element=>{
                const range1 = moment.range(startTime,endTime)
                const range2 = moment.range(element.startTime,element.endTime)
                console.log(range1,range2)
                console.log(range1.overlaps(range2))
                if(!(range1.overlaps(range2)) && resp.indexOf(e)==-1)
                resp.push(e)
                else if(range1.overlaps(range2))resp.pop(e)
            })
        })
        console.log(resp);
        res.status(200).json(resp)
    }
    catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const addBooking = async (eventId, venueId, startTime, endTime) => {
    try {
        const response = await Venue.updateOne({ _id: venueId }, { $push: { bookings: { startTime, endTime, event: eventId } } })

        return response

        // return json(response)    
    }
    catch (error) {
        throw error
    }
}
module.exports = { getVenues, addBooking }