import express from "express";
import { isAuthenticated } from "../middlewares/checkAuth.js";
import {
  createRoom,
  getRooms,
  getOwnerRooms,
  deleteRoom,
  updateRoom,
  toggleRoomAvailability,
  getRoomById,
} from "../controllers/room.controller.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post("/", upload.array("images", 4), isAuthenticated, createRoom);
router.get("/", getRooms);
router.get("/owner", isAuthenticated, getOwnerRooms);
router.delete("/:id", isAuthenticated, deleteRoom);
router.patch("/:id", isAuthenticated, updateRoom);
router.patch(
  "/:id/toggle-availability",
  isAuthenticated,
  toggleRoomAvailability
);
router.get("/:id", getRoomById);

export default router;
