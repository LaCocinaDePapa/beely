import express from 'express'
import urlRoutes from './routes/urlRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { connectDB } from './models/database/database.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
connectDB()
dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.LOCALHOST_FRONTEND,
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('404 Not Found')
})

//app.use('/api/url', urlRoutes)
//app.use('/api/user', userRoutes)
//app.use('/api/auth', authRoutes)
app.disable('x-powered-by')

const port = 5000
app.listen(port, () => {
  console.log(`server runing on port ${process.env.LOCALHOST_BACKEND}:${port}`)
})
