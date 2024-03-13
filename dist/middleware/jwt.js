"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    const secretKey = process.env.JWT_SECRET;
    if (!token) {
        console.error('No token');
        return res.redirect('/login');
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, decodedToken) => {
        if (err) {
            console.log("Error decoding token", err.message);
            return res.redirect('/login');
        }
        if (!decodedToken) {
            console.error('nvalid tokennn');
            throw new Error("Invalid token");
        }
        console.log(decodedToken);
        next();
    });
};
exports.requireAuth = requireAuth;
