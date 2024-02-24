"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.check)('name', 'Name is required').isString().isLength({ max: 50 }),
    (0, express_validator_1.check)('email', 'Email is required').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required').isLength({ min: 6 }),
];
exports.loginValidator = [
    (0, express_validator_1.check)('email', 'Name is required').isEmail().isLength({ max: 50 }),
    (0, express_validator_1.check)('password', 'Password is required').isLength({ min: 6 }),
];
