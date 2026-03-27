import express from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/checkAuth.js";
const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/sign-out", isAuthenticated, signout);

export default router;
