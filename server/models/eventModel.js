const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    venues: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = {Event, eventSchema}