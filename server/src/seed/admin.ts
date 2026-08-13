import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/auth.model";
import dotenv from "dotenv";

dotenv.config();

const seedUser = async () => {
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) return;
  try {
    await mongoose.connect(mongodbUri, {
      dbName: "boutique", // DB name
    });

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      username: "admin",
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin user created!");
    mongoose.disconnect();
  } catch (error) {
    console.error("ERROR SEEDING ADMIN", error);
    mongoose.disconnect();
  }
};

seedUser();
