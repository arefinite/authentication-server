"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, id) => {
    //generate token
    const token = jsonwebtoken_1.default.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    });
    //store token in cookie
    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PRODUCTION'
    });
};
exports.generateToken = generateToken;
