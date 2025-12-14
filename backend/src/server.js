import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import userRoutes from "../src/routes/user.route.js";

import path from "path";
import chatRoutes from "../src/routes/chat.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173", "http://localhost:5174"], // Must NOT be "*"
    credentials: true, //allow frontend to rsend cookies
  })
);

app.options("*", cors());

// Test route
app.get("/", (req, res) => {
  res.send("backend is running...");
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Connect DB then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to DB connection error", err);
    process.exit(1);
  });
