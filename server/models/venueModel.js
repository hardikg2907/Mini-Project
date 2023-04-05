const mongoose = require('mongoose')

const venueSchema = mongoose.Schema({
    name: {
        type: String
    }
})

module.exports = mongoose.model('Venue', venueSchema)