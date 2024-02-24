import { Request,Response } from "express";

// * Desc: Register User
// * URL: /api/v1/auth/register
// * Method: POST 
// * Access: Public
export const register = async(req:Request,res:Response) => {
  res.status(200).json({success:true, message: 'Register'})
}

// * Desc: Login User
// * URL: /api/v1/auth/login
// * Method: POST 
// * Access: Public
export const login = async(req:Request,res:Response) => {
  res.status(200).json({success:true, message: 'Login'})
}

// * Desc: Logout User
// * URL: /api/v1/auth/logout
// * Method: POST 
// * Access: Private
export const logout = async(req:Request,res:Response) => {
  res.status(200).json({success:true, message: 'Logout'})
}