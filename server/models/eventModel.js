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
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Venue'
        }],
        // required: true,
        default: []
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    statusBar: [{
        authority: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            default: 'pending'
        },
        authorityName: String
    }],
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    comments: {     
        type: [String]
    }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = {Event, eventSchema}