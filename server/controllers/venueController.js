const Venue = require('../models/venueModel')

const getVenues = async (req,res) => {

    try{
        const response = await Venue.find({})

        res.status(200).json(response)
    }
    catch(error)
    {
        res.status(404).json({error: error.message})
    }
}

module.exports = getVenues