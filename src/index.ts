import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import categoryRoutes from "./routes/categoryRoutes";
import subCategoryRoutes from "./routes/subCategoryRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes"

dotenv.config();

const app: Application = express();

// Middleware
app.use(cookieParser('your_secret_key'));
// const allowedOrigins = ['http://localhost:3000', 'https://marketease.netlify.app/'];
// const corsOptions: cors.CorsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow cookies to be sent with the request
// };
// app.use(cors(corsOptions));
app.use(cors({ credentials: true, origin: '*' }));
app.use(express.json());
app.use("/uploads", express.static('uploads'));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

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
