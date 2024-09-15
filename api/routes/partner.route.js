import express from "express";
import {
  getPostpartner,
  verifyID,
  updateIntrestedStatus,
} from "../controllers/partner.controller.js";

const router = express.Router();

router.post("/verifyId", verifyID);
router.get("/post/:id", getPostpartner);
router.put("/intrestedStatus", updateIntrestedStatus);

export default router;
