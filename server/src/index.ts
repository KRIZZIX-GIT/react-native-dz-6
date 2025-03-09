import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import router from './router/router'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import errorMiddleware from "./middlewares/error-middleware"



const app = express()

app.use(cors({
  origin: 'exp://192.168.110.245:8081',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

app.use(express.json())


app.use('/api', router)

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later'

}))

app.use(errorMiddleware)



const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`))
  } catch (err) {
    console.log(err)
  }
}

start()