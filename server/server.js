require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const eventRoutes = require('./routes/events')
const venueRoutes = require('./routes/venues')
const cors = require('cors')
const morgan = require('morgan')

const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(cors())

app.use('/api',userRoutes)
app.use('/api', eventRoutes)
app.use('/api',venueRoutes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}...`)
        })
    })
    .catch((err) => { console.log(err) })