import mongoose from "mongoose";
import { ENV } from "../config/env.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
    return conn.connection.host;
  } catch (error) {
    consol.log("Failed to connect to MongoDB", error.message);
    process.exit(1);
  }
};

export default connectDB;
