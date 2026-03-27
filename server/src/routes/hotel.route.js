import express from "express";
import {
  createHotel,
  getHotels,
  getHotel,
  deleteHotel,
  updateHotel,
} from "../controllers/hotel.controller.js";
import { isAuthenticated } from "../middlewares/checkAuth.js";

const router = express.Router();

router.use(isAuthenticated);
router.post("/", createHotel);
router.get("/", getHotels);
router.get("/:id", getHotel);
router.delete("/:id", deleteHotel);
router.patch("/:id", updateHotel);

export default router;
