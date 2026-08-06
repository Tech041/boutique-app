import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";

import helmet from "helmet";

import path from "path";

import ErrorHandler from "./utils/errorHandler";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { connectDB } from "./config/db";
import connectCloudinary from "./config/cloudinary";
import uploadRouter from "./routes/upload.route";
import productRouter from "./routes/product.route";

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://tfapparel-boutique.vercel.app", // dev
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app: Application = express();
app.use(express.json({ limit: "10mb" }));
app.use(helmet());
app.use(cookieParser());
app.use(cors(corsOptions));

connectDB();
connectCloudinary();

// For maintenance

const isMaintenance = process.env.MAINTENANCE_MODE === "true";

// Middleware to intercept requests
app.use((req: Request, res: Response, next) => {
  if (isMaintenance) {
    res.sendFile(path.join(__dirname, "public", "maintenance.html"));
  } else {
    next();
  }
});

app.set("trust proxy", 1); //this helps the throttling behind proxy like vercel

// health check for my server
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Boutique server is up and running!");
});

app.use("/api/products", uploadRouter);
app.use("/api/shop", productRouter);

// catch all non existing routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new ErrorHandler(404, `Route ${req.originalUrl} does not exist`);
  next(err);
});

// global error middleware
app.use(errorMiddleware);

export default app;
