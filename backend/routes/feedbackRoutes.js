import express from "express";
import { approveFeedback, createFeedback, deleteFeedback, listFeedback } from "../controllers/feedbackController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/feedback", createFeedback);
router.get("/admin/feedback", protectAdmin, listFeedback);
router.patch("/admin/feedback/:id/approve", protectAdmin, approveFeedback);
router.delete("/admin/feedback/:id", protectAdmin, deleteFeedback);

export default router;
