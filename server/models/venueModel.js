const mongoose = require('mongoose')

const venueSchema = mongoose.Schema({
    name: {
        type: String
    },
    bookings: [
        {
            startTime: Date,
            endTime: Date,
            event: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Event'
            }
        }
    ],
    faculty: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Venue', venueSchema)