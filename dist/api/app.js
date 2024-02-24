"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const auth_1 = require("./routes/auth");
const http_errors_1 = __importStar(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//initialize express app
exports.app = (0, express_1.default)();
//middlewares
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((0, express_1.urlencoded)({ extended: true }));
exports.app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    exports.app.use((0, morgan_1.default)('dev'));
}
//routes
exports.app.use('/api/v1/auth', auth_1.authRouter);
//error handlers
exports.app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, 'Invalid endpoint'));
});
exports.app.use((error, req, res, next) => {
    let errorMsg = 'An unexpected error occurred';
    let statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMsg = error.message;
    }
    res.status(statusCode).json({ success: false, message: errorMsg });
});
