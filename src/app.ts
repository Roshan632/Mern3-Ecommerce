// import express from 'express';
// import './database/connection.js';


// const app = express();

// export default app;


import express, { Request, Response } from 'express'

import userRoute from './routes/userRoute'
import "./database/connection"
import categoryRoute from './routes/categoryRoute'
import productRoute from './routes/productRoute'
import OrderRoute from './routes/orderRoute'
import CartRoute from './routes/cartRoute'
import cors from 'cors'
import path from 'node:path'




const app = express()
const allowedOrigins = (process.env.CLIENT_URL ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
            return
        }
        callback(new Error('Origin is not allowed by CORS'))
    },
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)
app.use("/api/order",OrderRoute)
app.use("/api/cart",CartRoute)

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }))
app.use(express.static(path.resolve(process.cwd(), 'src/uploads')))
// const schedule = require('node-schedule');

// const job = schedule.scheduleJob('42 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });  // Yo chai supabase afai automatically banda hunxa yadi hamile 1 hafta samma table ma push garinam vane
// So TESAILE NPM I NODE-SCHEDULE VANNE PACKAGE LE SUPABASE MA AUTOMATICALLY 42 MIN MA PUSH GARDINXA YO CODE LE TESLE GARDA SUPABSE ACTIVE VARSAKHAXA

export default app