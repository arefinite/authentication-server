import express, { NextFunction, Request, Response, urlencoded } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import { authRouter } from './routes/auth'
import createHttpError, { isHttpError } from 'http-errors'

// * initialize express app
export const app = express()

// * middlewares
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'))
}
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)
app.use(express.json())
app.use(urlencoded({ extended: true }))

// * routes
app.use('/api/v1/auth', authRouter)

// * error handlers
app.use((req, res, next) => {
  next(createHttpError(404, 'Invalid endpoint'))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMsg = 'An unexpected error occurred'
  let statusCode = 500
  if (isHttpError(error)) {
    statusCode = error.status
    errorMsg = error.message
  }
  res.status(statusCode).json({ success: false, message: errorMsg })
})
