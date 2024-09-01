import express from "express";
import { verifyID } from "../controllers/partner.controller.js";

const router = express.Router();

router.post("/verifyId", verifyID);


export default router;
