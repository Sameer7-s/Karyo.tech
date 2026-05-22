import express from "express";
import { createNewsletter, deleteNewsletter, listNewsletter } from "../controllers/newsletterController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/newsletter", createNewsletter);
router.get("/admin/newsletter", protectAdmin, listNewsletter);
router.delete("/admin/newsletter/:id", protectAdmin, deleteNewsletter);

export default router;
