import mongoose from "mongoose";
import dotenv from "dotenv";
import ErrorHandler from "../utils/errorHandler";

dotenv.config();

const MONGO_URI: string = process.env.MONGODB_URI || "";

let isConnected: boolean = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "boutique", // DB name
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("MongoDB connection error:", error);
    new ErrorHandler(500, "Internal server error");
    process.exit(1); // exit process if connection fails
  }
};
