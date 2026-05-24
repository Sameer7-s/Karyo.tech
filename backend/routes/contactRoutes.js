import express from "express";
import rateLimit from "express-rate-limit";
import { createContact, deleteContact, getContact, listContacts, updateContactStatus } from "../controllers/contactController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many submissions. Please try again in a few minutes." },
});

router.post("/contact", contactLimiter, createContact);
router.get("/leads", protectAdmin, listContacts);
router.get("/admin/contacts", protectAdmin, listContacts);
router.get("/admin/contacts/:id", protectAdmin, getContact);
router.patch("/admin/contacts/:id/status", protectAdmin, updateContactStatus);
router.delete("/admin/contacts/:id", protectAdmin, deleteContact);

export default router;
