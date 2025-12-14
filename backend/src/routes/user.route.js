import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  getRecommendedUsers,
  getMyFriends,
  sendFriendrequest,
  acceptFriendrequest,
  getFriendRequests,
  getOutgoingFriendRequests,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendrequest);

router.put("/friend-request/:id", acceptFriendrequest);
router.get("/friend-requests", getFriendRequests);

router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

export default router;
