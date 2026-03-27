import express from "express";
import { isAuthenticated } from "../middlewares/checkAuth.js";
import {
  createRoom,
  getRooms,
  getRoom,
  deleteRoom,
  updateRoom,
} from "../controllers/room.controller.js";
const router = express.Router();

router.use(isAuthenticated);
router.post("/", createRoom);
router.get("/", getRooms);
router.get("/:id", getRoom);
router.delete("/:id", deleteRoom);
router.patch("/:id", updateRoom);

export default router;
