import { verifyToken } from './../middlewares/auth'
import { registerValidator, loginValidator } from './../validators/auth'
import { Router } from 'express'
import { login, logout, register, validateUser } from '../controllers/auth'

export const authRouter = Router()

authRouter.post('/register', registerValidator, register)
authRouter.post('/login', loginValidator, login)
authRouter.post('/logout', logout)
authRouter.get('/validate-user',verifyToken, validateUser)
