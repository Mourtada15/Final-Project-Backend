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
const express_1 = __importDefault(require("express"));
const userControllers = __importStar(require("../controllers/userControllers"));
const jwt_1 = require("../middleware/jwt");
const router = express_1.default.Router();
router.post('/register', (req, res) => userControllers.register(req, res));
router.post('/login', (req, res) => userControllers.login(req, res));
router.use(jwt_1.requireAuth);
router.get('/', (req, res) => userControllers.getUsers(req, res));
router.get('/:id', (req, res) => userControllers.getUser(req, res));
router.put('/:id', (req, res) => userControllers.updateUser(req, res));
router.delete('/:id', (req, res) => userControllers.deleteUser(req, res));
exports.default = router;