const router = require("express").Router();
const nodemailer = require('nodemailer');


router.get('/', (req, res) => {
    try {
        // default get method
        res.send({ message: "hello, this is the email notification home page!" })
    } catch (err) {
        res.json({ message: err });
    }
});


const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.USERKEY
    }
});
router.post('/', (req, res) => {
    try {
        // default post method
        const message = {
            from: 'ashwinrobot1999@gmail.com', // Sender address
            to: 'acchu99@gmail.com',         // List of recipients
            subject: 'This is another sample email from my bot', // Subject line
            text: req.body.messageText // Plain text body
        };
        transport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log(info);
            }
        });
        res.send({ sent: message });
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;
