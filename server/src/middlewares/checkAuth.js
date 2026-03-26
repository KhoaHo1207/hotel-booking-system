import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import User from "../models/User.model.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }

  const decoded = jwt.verify(token, ENV.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError("Unauthorized", 401));
  }

  req.user = user;
  next();
});
