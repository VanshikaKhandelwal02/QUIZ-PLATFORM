import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5050;

import connectDB from "./config/db.js";
// 🧠 Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});

// 🌐 Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// 🧪 Logging middleware
app.use((req, res, next) => {
  console.log(`🔄 Incoming request: ${req.method} ${req.url}`);
  next();
});

// 📡 Ping
app.get("/ping", (req, res) => {
  console.log("📶 Ping received!");
  res.send("pong");
});

// 🔃 Routes
import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quiz.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

// ❌ Error handler
app.use((err, req, res, next) => {
  console.error("* Error middleware caught:", err);
  res.status(500).json({ message: "Something broke on the server" });
});


