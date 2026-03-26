import authRoutes from "./auth.route.js";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
};

export default initRoutes;
