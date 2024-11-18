import express from "express"
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.get('/', (req, res) => {
    res.send('404 Not Found')
})

//app.use('/api/url', urlRoutes)
//app.use('/api/user', userRoutes)
//app.use('/api/auth', authRoutes)
app.disable('x-powered-by')

export default app
