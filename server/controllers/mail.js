const nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "hardik.garg@spit.ac.in",
        pass: 'Hardik-2907'
    }
})

const sendFacultyMail = async (email, committee, event) => {

    let details = {
        from: "hardik.garg@spit.ac.in",
        to: email,
        subject: "Testing for Campus Connect",
        text: `We have sent you this mail to inform you that ${committee} has requested your permission for their event ${event}.\nOnly testing for Campus Connect is going on rn.`
    }
    console.log("email= ",email)
    mailTransporter.sendMail(details, (err) => {
        if (err) console.log(err)
        else {
            console.log(`email has been sent to ${email}`)
        }
    })
}

const sendCommMail = async (email, event,status) => {
    let details = {
        from: "hardik.garg@spit.ac.in",
        to: email,
        subject: `Your event ${event} got ${status}${status=='approved'?"!!":" :("}`,
        text: `Your event ${event} got ${status}${status=='approved'?"!!":" :("}`
    }
    console.log("email= ",email)
    mailTransporter.sendMail(details, (err) => {
        if (err) console.log(err)
        else {
            console.log(`email has been sent to ${email}`)
        }
    })
}

module.exports = {
    sendFacultyMail,
    sendCommMail
}