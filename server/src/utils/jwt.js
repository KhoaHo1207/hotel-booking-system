import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const generateToken = (id) => {
  return jwt.sign({ id }, ENV.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24 * 30,
  });
};

export default generateToken;
