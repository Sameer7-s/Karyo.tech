import express from "express";
import { createProjectInquiry, deleteProjectInquiry, getProjectInquiry, listProjectInquiries, updateProjectStatus } from "../controllers/projectInquiryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/project-inquiry", createProjectInquiry);
router.get("/admin/project-inquiries", protectAdmin, listProjectInquiries);
router.get("/admin/project-inquiries/:id", protectAdmin, getProjectInquiry);
router.patch("/admin/project-inquiries/:id/status", protectAdmin, updateProjectStatus);
router.delete("/admin/project-inquiries/:id", protectAdmin, deleteProjectInquiry);

export default router;
