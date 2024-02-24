import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import { User } from '../models/user'
import { generateToken } from '../services/auth'

// * Desc: Register User
// * URL: /api/v1/auth/register
// * Method: POST
// * Access: Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //validation checks
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return next(createHttpError(400, { message: errors.array() }))

  const { name, email, password } = req.body
  try {
    //check if user already registered
    const user = await User.findOne({ email })
    if (user) return next(createHttpError(400, 'User already registered'))
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10)
    //register the new user
    const createUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    if (!createUser) return next(createHttpError(400, 'Registration failed'))

    //generate token and store it in cookie
    generateToken(res, createUser._id)

    //sending success response
    res.status(201).json({ success: true, message: 'Registration successful' })
  } catch (err) {
    next(createHttpError(500, 'Something went wrong'))
  }
}

// * Desc: Login User
// * URL: /api/v1/auth/login
// * Method: POST
// * Access: Public
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return next(createHttpError(400, { message: errors.array() }))

  const { email, password } = req.body
  try {
    //check if user exits
    const user = await User.findOne({ email })
    if (!user) return next(createHttpError(400, 'User not found'))
    //verify password
    const verifyPassword = await bcrypt.compare(password, user.password)
    if (!verifyPassword) return next(createHttpError(400, 'Wrong credentials'))
    //generate token and store it in cookie
    generateToken(res, user._id)
    //sending success response
    res.status(201).json({ success: true, message: 'Login successful' })
  } catch (err) {
    next(createHttpError(500, 'Something went wrong'))
  }
}

// * Desc: Logout User
// * URL: /api/v1/auth/logout
// * Method: POST
// * Access: Private
export const logout = async (req: Request, res: Response) => {
  res.clearCookie('auth_token')
  res.status(200).json({ success: true, message: 'Logout successful' })
}

// * Desc: Validate User
// * URL: /api/v1/auth/validate-user
// * Method: GET
// * Access: Private
export const validateUser = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, userId: req.userId })
}

// * Desc: Get user information
// * URL: /api/v1/auth/user-info
// * Method: GET
// * Access: Private
export const userInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.userId
  try {
    const user = await User.findById(id)
    if (!user) return next(createHttpError(400, 'User not found'))
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    })
  } catch (err) {
    next(createHttpError(500, 'Something went wrong'))
  }
}
