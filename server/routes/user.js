const express = require('express')
const {signupUser, loginUser, changePassword, changeDetails,getUserEvents} = require('../controllers/userController')

const router = express.Router();

// login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

router.put('/updatePass', changePassword)

router.get('/getUserEvents', getUserEvents)

// router.patch('/update', changeDetails)

module.exports = router;