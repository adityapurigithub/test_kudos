import express from "express";
import {
  loginUser,
  getAllKudoBadges,
  getAllUsers,
  giveKudos,
  getAllKudos,
  likeKudo,
  getAnalyticsData,
} from "../controllers/main.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/badges", getAllKudoBadges);

router.get("/users", getAllUsers);

router.post("/give-kudos", giveKudos);

router.get("/all-kudos", getAllKudos);

router.put("/like-kudo/:id", likeKudo);

router.get("/analytics", getAnalyticsData);

export default router;
