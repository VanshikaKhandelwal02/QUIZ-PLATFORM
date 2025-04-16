import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getUserQuizzes,
  getQuizById,
} from "../controllers/quiz.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ THIS IS THE LINE YOU ASKED ABOUT:
router.post("/create", protect, createQuiz);

// 📋 Public route: anyone can see all quizzes
router.get("/", getAllQuizzes);

// 👤 Only the logged-in user can see their own quizzes
router.get("/mine", protect, getUserQuizzes);

// 🎮 Anyone can play a quiz by ID
router.get("/:id", getQuizById);

export default router;
