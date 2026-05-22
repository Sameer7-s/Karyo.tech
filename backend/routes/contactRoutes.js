import express from "express";
import { createContact, deleteContact, getContact, listContacts, updateContactStatus } from "../controllers/contactController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/contact", createContact);
router.get("/admin/contacts", protectAdmin, listContacts);
router.get("/admin/contacts/:id", protectAdmin, getContact);
router.patch("/admin/contacts/:id/status", protectAdmin, updateContactStatus);
router.delete("/admin/contacts/:id", protectAdmin, deleteContact);

export default router;
