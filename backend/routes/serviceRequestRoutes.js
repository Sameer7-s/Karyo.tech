import express from "express";
import { createServiceRequest, deleteServiceRequest, getServiceRequest, listServiceRequests, updateServicePriority, updateServiceStatus } from "../controllers/serviceRequestController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/service-request", createServiceRequest);
router.get("/admin/service-requests", protectAdmin, listServiceRequests);
router.get("/admin/service-requests/:id", protectAdmin, getServiceRequest);
router.patch("/admin/service-requests/:id/status", protectAdmin, updateServiceStatus);
router.patch("/admin/service-requests/:id/priority", protectAdmin, updateServicePriority);
router.delete("/admin/service-requests/:id", protectAdmin, deleteServiceRequest);

export default router;
