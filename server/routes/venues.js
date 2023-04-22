const express = require('express')
const {getVenues} = require('../controllers/venueController')

const router = express.Router()

router.get('/venues', getVenues)

module.exports = router