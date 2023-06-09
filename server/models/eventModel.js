const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Reply = mongoose.model('Reply', replySchema)

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    replies: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Reply'
        }],
        default: []
    }, // An array of replies associated with the comment
    eventId: {
        type: String
    }
});

const Comment = mongoose.model('Comment', commentSchema)

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
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Comment'
        }],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = {Event, eventSchema, Reply, Comment}