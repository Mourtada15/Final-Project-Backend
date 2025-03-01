"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const subCategoryRoutes_1 = __importDefault(require("./routes/subCategoryRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cookie_parser_1.default)('your_secret_key'));
app.use((0, cors_1.default)({
    credentials: true,
    origin: ['http://localhost:3000', 'https://marketease.netlify.app']
}));
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static('uploads'));
// Routes
app.use('/api/categories', categoryRoutes_1.default);
app.use('/api/subcategories', subCategoryRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
// Connect to db
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Connected to db & Listening on port ${process.env.PORT}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
});
