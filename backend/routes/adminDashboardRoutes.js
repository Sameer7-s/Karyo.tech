import express from "express";
import { dashboardStats } from "../controllers/dashboardController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/dashboard-stats", protectAdmin, dashboardStats);

export default router;
