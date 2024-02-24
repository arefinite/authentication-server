"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfo = exports.validateUser = exports.logout = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
// * Desc: Register User
// * URL: /api/v1/auth/register
// * Method: POST
// * Access: Public
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //validation checks
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return next((0, http_errors_1.default)(400, { message: errors.array() }));
    const { name, email, password } = req.body;
    try {
        //check if user already registered
        const user = yield user_1.User.findOne({ email });
        if (user)
            return next((0, http_errors_1.default)(400, 'User already registered'));
        //hashing the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        //register the new user
        const createUser = yield user_1.User.create({
            name,
            email,
            password: hashedPassword,
        });
        if (!createUser)
            return next((0, http_errors_1.default)(400, 'Registration failed'));
        //generate token and store it in cookie
        (0, auth_1.generateToken)(res, createUser._id);
        //sending success response
        res.status(201).json({ success: true, message: 'Registration successful' });
    }
    catch (err) {
        next((0, http_errors_1.default)(500, 'Something went wrong'));
    }
});
exports.register = register;
// * Desc: Login User
// * URL: /api/v1/auth/login
// * Method: POST
// * Access: Public
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return next((0, http_errors_1.default)(400, { message: errors.array() }));
    const { email, password } = req.body;
    try {
        //check if user exits
        const user = yield user_1.User.findOne({ email });
        if (!user)
            return next((0, http_errors_1.default)(400, 'User not found'));
        //verify password
        const verifyPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!verifyPassword)
            return next((0, http_errors_1.default)(400, 'Wrong credentials'));
        //generate token and store it in cookie
        (0, auth_1.generateToken)(res, user._id);
        //sending success response
        res.status(201).json({ success: true, message: 'Login successful' });
    }
    catch (err) {
        next((0, http_errors_1.default)(500, 'Something went wrong'));
    }
});
exports.login = login;
// * Desc: Logout User
// * URL: /api/v1/auth/logout
// * Method: POST
// * Access: Private
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('auth_token');
    res.status(200).json({ success: true, message: 'Logout successful' });
});
exports.logout = logout;
// * Desc: Validate User
// * URL: /api/v1/auth/validate-user
// * Method: GET
// * Access: Private
const validateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ success: true, userId: req.userId });
});
exports.validateUser = validateUser;
// * Desc: Get user information
// * URL: /api/v1/auth/user-info
// * Method: GET
// * Access: Private
const userInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    try {
        const user = yield user_1.User.findById(id);
        if (!user)
            return next((0, http_errors_1.default)(400, 'User not found'));
        res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (err) {
        next((0, http_errors_1.default)(500, 'Something went wrong'));
    }
});
exports.userInfo = userInfo;
