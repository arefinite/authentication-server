import { check } from 'express-validator'

export const registerValidator = [
  check('name', 'Name is required').isString().isLength({ max: 50 }),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').isLength({ min: 6 }),
]

export const loginValidator = [
  check('email', 'Name is required').isEmail().isLength({ max: 50 }),
  check('password', 'Password is required').isLength({ min: 6 }),
]
