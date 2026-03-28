import express from "express";
import { isAuthenticated } from "../middlewares/checkAuth.js";
import {
  getUserBookings,
  getHotelBookings,
  checkAvailabilityAPI,
  createBooking,
} from "../controllers/booking.controller.js";
const router = express.Router();

router.post("/book", isAuthenticated, createBooking);
router.post("/check-availability", checkAvailabilityAPI);
router.get("/user", isAuthenticated, getUserBookings);
router.get("/hotel", isAuthenticated, getHotelBookings);

export default router;
