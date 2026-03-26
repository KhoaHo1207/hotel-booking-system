import User from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.js";
import { generateAvatar } from "../utils/generateAvatar.js";

export const signup = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password, fullName } = req.body;

  const isExistedUser = await User.findOne({ email });

  if (isExistedUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const avatar = generateAvatar(fullName.trim());

  const user = await User.create({
    email,
    fullName: fullName.trim(),
    password: hashedPassword,
    avatar,
    isVerified: true,
  });

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
});

export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "User not found",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }

  const token = generateToken(user._id);

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      maxAge: Number(ENV.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000,
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    })
    .json({
      success: true,
      message: "User signed in successfully",
    });
});

export const signout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "User signed out successfully",
  });
});
