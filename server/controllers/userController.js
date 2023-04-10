const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const { create } = require('../models/workoutModel')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password, type } = req.body

    try {
        const user = await User.login(email, password, type)

        const token = createToken(user._id)

        res.status(200).json({ email, token, type})
    }
    catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        const token = createToken(user._id)

        return res.status(200).json({ email, token })
    }
    catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

// update user 
const changeDetails = async (req, res) => {

}

// change password
const changePassword = async (req, res) => {
    const { email, password, confirmPassword } = req.body

    if (password !== confirmPassword)
        return res.status(400).json({ error: 'Both passwords should match.' })

    const exists = await User.findOne({ email })
    if (!exists) throw Error('Email doesn\'t exist')

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    try {
        const user = await User.findOneAndUpdate({ email }, { password: hash })

        return res.status(200).json(user)
    }
    catch (error) {
        return res.status(400).json({ error: error })
    }

}

const addEvent = async (eventId, userId) => {
    try {
        const user = await User.updateOne({ _id: userId }, { $push: { events: eventId } })
        await User.updateOne({email: 'deepak@gandu.com'}, { $push: { permissions: eventId  } })
        // console.log('user created')

        return user
    }
    catch (error) {
        return json({ error: error })
    }
}

const getUserEvents = async (req, res) => {
    const { email,type } = req.query
    // console.log(email)
    const events = type=='Committee' ? 'events' : 'permissions'
    try {
        const response = await User.find({ email }).populate({path:`${events}`,
    populate: {path: 'venues user'}})
        // console.log(response)

        res.status(200).json(response)
    }
    catch (error) {
        return res.status(400).json({error})
    }
}

const removeEvent = async (eventId, userId) => {
    try {
        const user = await User.updateOne({ _id: userId }, { $pull: { events: eventId } })
        await User.updateOne({email: 'deepak@gandu.com'}, { $pull: { permissions: eventId  } })
        // console.log('user created')

        return user
    }
    catch (error) {
        return json({ error: error })
    }
}

module.exports = {
    loginUser,
    signupUser,
    changePassword,
    changeDetails,
    addEvent,
    getUserEvents,
    removeEvent
}