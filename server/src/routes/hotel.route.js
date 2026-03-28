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

router.post("/", isAuthenticated, createHotel);
router.get("/", getHotels);
router.get("/:id", getHotel);
router.delete("/:id", isAuthenticated, deleteHotel);
router.patch("/:id", isAuthenticated, updateHotel);

export default router;
