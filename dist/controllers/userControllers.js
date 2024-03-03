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
exports.deleteUser = exports.updateUser = exports.login = exports.register = exports.getUser = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid user ID." });
    }
    try {
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUser = getUser;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, phoneNumber, location, email, password, confirmPassword } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Check if user already exists
        const existingUser = yield userModel_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use!' });
        }
        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match!' });
        }
        const newUser = yield userModel_1.default.create({
            firstName, lastName, phoneNumber, location, email, password: hashedPassword
        });
        res.status(200).json({ message: "User created succefully!" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const secretKey = process.env.JWT_SECRET;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secretKey, { expiresIn: '24h' });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 * 24, secure: true, sameSite: 'none' });
        return res.status(200).json({ message: 'logged in successfully!', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid user ID!" });
    }
    try {
        const updateUser = yield userModel_1.default.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!updateUser) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json({ message: "User updated successfully!" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid user ID!" });
    }
    try {
        const deleteUser = yield userModel_1.default.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).json({ error: "User not found." });
        }
        res.status(200).json({ message: "User deleted successfully!" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
