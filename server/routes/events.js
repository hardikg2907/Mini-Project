const express = require('express');
const {createEvent, getAllEvents, getEvent, updateEvent, deleteEvent} = require('../controllers/eventController')

const router = express.Router();

//create a new event
router.post('/events',createEvent)

router.get('/events', getAllEvents)

router.get('/event/:_id', getEvent)

router.patch('/event/:_id', updateEvent)

router.delete('/event/:_id', deleteEvent)

module.exports = router