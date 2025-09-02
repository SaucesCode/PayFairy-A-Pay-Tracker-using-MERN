import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./confg/db.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import agreementRoutes from "./routes/agreementRoutes.js";
import { fileURLToPath } from "url";

// Recreate __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverDir = path.resolve();

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN || "*",
      credentials: false,
    })
  );
}

app.use("/api/auth", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/agreements", agreementRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(serverDir, "../client/dist")));
  app.get("/*w", (req, res) => {
    res.sendFile(path.join(serverDir, "../client", "dist", "index.html"));
  });
}

// PORT
const port = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server running on port", port);
  });
});
