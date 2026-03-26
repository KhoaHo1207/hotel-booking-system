import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import cookieParser from "cookie-parser";
import connectDB from "./database/connectDB.js";
import { errorMiddleware } from "./middlewares/errorMiddlware.js";
import initRoutes from "./routes/index.route.js";
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: [ENV.FROTNEND_URL || "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.use(errorMiddleware);

connectDB();

initRoutes(app);

app.get("/", (req, res) => {
  return res.send("fuckking bitch");
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
