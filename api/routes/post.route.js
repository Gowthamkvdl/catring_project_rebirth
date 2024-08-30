import express from "express";
import {
  addPost,
  deletePost,
  deletePosts,
  getPost,
  getPosts,
  intrested,
  updatePost,
  updatePostStatus,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.post("/intrested", verifyToken, intrested);
router.put("/status/:id", verifyToken, updatePostStatus);
router.delete("/:id", verifyToken, deletePost);
router.delete("/", verifyToken, deletePosts);

export default router;
