import express from "express";
import { isAuthenticated } from "../middlewares/checkAuth.js";
import {
  createRoom,
  getRooms,
  getRoom,
  deleteRoom,
  updateRoom,
  toggleRoomAvailability,
} from "../controllers/room.controller.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post("/", upload.array("images", 4), isAuthenticated, createRoom);
router.get("/", getRooms);
router.get("/:id", getRoom);
router.delete("/:id", isAuthenticated, deleteRoom);
router.patch("/:id", isAuthenticated, updateRoom);
router.patch(
  "/:id/toggle-availability",
  isAuthenticated,
  toggleRoomAvailability
);

export default router;
