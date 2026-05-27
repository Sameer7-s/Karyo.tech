import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import { initDatabase } from "./config/db.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import serviceRequestRoutes from "./routes/serviceRequestRoutes.js";
import projectInquiryRoutes from "./routes/projectInquiryRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import { errorHandler, notFoundRoute } from "./middleware/errorMiddleware.js";

const app = express();
const port = Number(process.env.PORT || 5000);
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
const allowedOrigins = new Set([
  clientUrl,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "http://localhost:5173",
]);

initDatabase();

app.disable("x-powered-by");
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api", adminDashboardRoutes);
app.use("/api", contactRoutes);
app.use("/api", serviceRequestRoutes);
app.use("/api", projectInquiryRoutes);
app.use("/api", newsletterRoutes);
app.use("/api", feedbackRoutes);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(distPath, "index.html"));
    }
    next();
  });
  console.log(`Serving static frontend from ${distPath}`);
}

app.use(notFoundRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
