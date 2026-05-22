import express from "express";
import rateLimit from "express-rate-limit";
import { changePassword, loginAdmin, logout, me, updateSettings } from "../controllers/adminAuthController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Please try again later." },
});

router.post("/login", loginLimiter, loginAdmin);
router.get("/me", protectAdmin, me);
router.post("/logout", protectAdmin, logout);
router.patch("/settings", protectAdmin, updateSettings);
router.patch("/settings/password", protectAdmin, changePassword);

export default router;
