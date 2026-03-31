import express from "express";
import {
  getProfile,
  getUsers,
  storeRecentSearchedCities,
  getRecentSearchedCities,
  getRecommendRooms,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/checkAuth.js";
const router = express.Router();

router.get("/all", getUsers);
router.get("/profile", isAuthenticated, getProfile);
router.post(
  "/store-recent-searched-cities",
  isAuthenticated,
  storeRecentSearchedCities
);
router.get("/recent-searched-cities", isAuthenticated, getRecentSearchedCities);
router.get("/recommend-rooms", isAuthenticated, getRecommendRooms);
export default router;
