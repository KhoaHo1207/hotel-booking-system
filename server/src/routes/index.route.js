import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import hotelRoutes from "./hotel.route.js";
import bookingRoutes from "./booking.route.js";
import roomRoutes from "./room.route.js";
const initRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/hotel", hotelRoutes);
  app.use("/api/v1/booking", bookingRoutes);
  app.use("/api/v1/room", roomRoutes);
};

export default initRoutes;
