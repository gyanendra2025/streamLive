import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { generateStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/token", protectedRoute, generateStreamToken);
export default router;
