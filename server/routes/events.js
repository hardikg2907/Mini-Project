const express = require('express');
const {createEvent, getAllEvents, getEvent, updateEvent, deleteEvent, getEventsStatus,updateStatusBar} = require('../controllers/eventController')
const {addComment, addReply, getAllComments} = require('../controllers/commentController')

const router = express.Router();

//create a new event
router.post('/events',createEvent)

router.get('/events', getAllEvents)

router.get('/event/:_id', getEvent)

router.patch('/event/:_id', updateEvent)

router.patch('/event/status/:_id',updateStatusBar)

router.delete('/event/:_id', deleteEvent)

// router.get('/comments', getAllComments)
router.post('/event/comment', addComment)

router.post('/event/reply',addReply)

module.exports = router