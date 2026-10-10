import nodemailer from 'nodemailer'
import { envConfig } from '../config/config'

interface IData{
    to : string, 
    subject : string, 
    text : string
}

const sendMail = async (data:IData)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: envConfig.email,
            pass: envConfig.emailPassword,
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    const mailOptions = {
        from: "Digital Dokaan <whoezroshan@gmail.com>",
        to: data.to,
        subject: data.subject,
        text: data.text,
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Email send failed:', error)
        throw error
    }
}

export default sendMail