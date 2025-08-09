//arranque del servidor y montaje de rutas
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import templateRoutes from "./routes/template.routes.js";
import documentRoutes from "./routes/document.routes.js";
import analyticsRoutes from './routes/analytics.routes.js';

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/documents", documentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.get("/api/health", (req, res) => res.json({ ok: true }));
const PORT = process.env.PORT || 4000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("API http://localhost:" + PORT));
  })
  .catch((err) => {
    console.error("DB error", err);
    process.exit(1);
  });
