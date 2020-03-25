const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodeMailer = require('nodemailer')
const dotenv = require('dotenv')

const app = express()
dotenv.config({path: `${__dirname}/.env`})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT
const SERVICE_KEY = process.env.SERVICE_KEY
const SERVICE = process.env.SERVICE
const SERVICE_EMAIL = process.env.SERVICE_EMAIL

const sendEmail = (options) => {
    let transporter = nodeMailer.createTransport({
        service: SERVICE,
        auth: {
            user: SERVICE_EMAIL,
            pass: SERVICE_KEY
        }
    });

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err)
        }

        console.log('Сообщение успешно отправлено !')
    })
}

app.post('/send-email', (req, res) => {
    const options = {
        from: SERVICE_EMAIL,
        to: SERVICE_EMAIL,
        subject: 'Голодный бизнес',
        html:
            `
                <div>
                    <h1>${req.body.reason}</h1>
                    <p>${req.body.name}</p>
                    <p>${req.body.phone}</p>
                    <p>${req.body.email}</p>
                    <p>${req.body.text}</p>
                </div>
            `
    };

    sendEmail(options)
    res.send()
})

app.listen(PORT, () => {
    console.log(`Server starting on port: ${PORT}`)
})

