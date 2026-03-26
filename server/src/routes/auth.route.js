import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { signinSchema, signupSchema } from "../validators/auth.validator.js";
import { signin, signup, signout } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/checkAuth.js";
const router = express.Router();

router.post("/sign-up", validate(signupSchema), signup);
router.post("/sign-in", validate(signinSchema), signin);
router.post("/sign-out", isAuthenticated, signout);

export default router;
