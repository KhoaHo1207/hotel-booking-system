import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.js";
import { generateAvatar } from "../utils/generateAvatar.js";
import { ENV } from "../config/env.js";

export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.trim().length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    if (username.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters long",
      });
    }

    if (!email.trim().includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const isExistedUser = await User.findOne({ email });

    if (isExistedUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      username: username.trim(),
      password: hashedPassword,
      image: generateAvatar(username.trim()),
      isVerified: true,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error || "Internal Server Error");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!email.trim().includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      })
      .json({
        success: true,
        message: "Logged in successfully",
      });
  } catch (error) {
    console.log(error || "Internal Server Error");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const signout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        maxAge: 0,
        sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.log(error || "Internal Server Error");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
