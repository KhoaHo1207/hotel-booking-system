import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import hotelRoutes from "./hotel.route.js";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/hotel", hotelRoutes);
};

export default initRoutes;
