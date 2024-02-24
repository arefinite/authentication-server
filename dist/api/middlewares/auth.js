"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const verifyToken = (req, res, next) => {
    const token = req.cookies['auth_token'];
    if (!token)
        return next((0, http_errors_1.default)(401, 'Unauthorized access'));
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        next((0, http_errors_1.default)(401, 'Unauthorized access'));
    }
};
exports.verifyToken = verifyToken;
