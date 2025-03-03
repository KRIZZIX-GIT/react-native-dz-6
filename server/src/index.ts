import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import router from './router/router'
import rateLimit from 'express-rate-limit'
import errorMiddleware from "./middlewares/error-middleware"


const app = express()


app.use(express.json())

app.use(helmet())

app.use('/api', router)

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
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