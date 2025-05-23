import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import categoryRoutes from "./routes/categoryRoutes";
import subCategoryRoutes from "./routes/subCategoryRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import searchRoutes from "./routes/searchRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cookieParser('your_secret_key'));

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'https://marketease.netlify.app']
}));
app.use(express.json());
app.use("/uploads", express.static('uploads'));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/search', searchRoutes);

// Connect to db
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(process.env.PORT!, () => {
      console.log(`Connected to db & Listening on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  });
