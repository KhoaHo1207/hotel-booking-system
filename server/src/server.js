import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import cookieParser from "cookie-parser";
import connectDB from "./database/connectDB.js";
import initRoutes from "./routes/index.route.js";
import connectCloudinary from "./config/cloudinray.js";

connectDB();
connectCloudinary();

const app = express();
app.use(
  cors({
    origin: "https://hotel-booking-system-nine-amber.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

initRoutes(app);

app.get("/", (req, res) => {
  return res.send("fuckking bitch");
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
