import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  deleteUser,
  updateUser,
  savePost,
  profilePosts,
  getCater,
  getServer,
  addUserRating,
  getCaters,
  getServers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/caters", getCaters);
router.get("/servers", getServers);
router.get("/oneCater/:id", verifyToken, getCater);
router.get("/oneServer/:id", verifyToken, getServer);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.post("/rating", verifyToken, addUserRating);
router.get("/profilePosts/:id", verifyToken, profilePosts);

export default router;
