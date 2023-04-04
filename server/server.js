require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const eventRoutes = require('./routes/events')
// const cors = require('cors')

const app = express();

app.use(express.json())
// app.use(cors)

app.use('/api',userRoutes)
app.use('/api', eventRoutes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}...`)
        })
    })
    .catch((err) => { console.log(err) })