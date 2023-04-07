const Venue = require('../models/venueModel')

const getVenues = async (req, res) => {
    const { startTime, endTime } = req.query
    console.log(req.query)

    try {
        let response = await Venue.find({})

        // let resp = response.filter((e) =>
        //     e.bookings.forEach(element => {
        //         if (!((element.startTime.getTime() >= Date.parse(startTime) && element.startTime.getTime() <= Date.parse(endTime)) || (element.endTime.getTime() >= Date.parse(startTime) && element.endTime.getTime() <= Date.parse(endTime))))
        //             return false
        //         else return true

        //     }))
        // console.log(response);
        res.status(200).json(response)
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