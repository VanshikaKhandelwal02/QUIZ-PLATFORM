import Quiz from "../models/Quiz.js";

// @desc   Create a new quiz

// quiz.controller.js

export const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    console.log("🧠 Quiz create body:", { title, questions });
    console.log("🔐 Authenticated user:", req.user);

    const quiz = await Quiz.create({
      title,
      questions,
      user: req.user.id,
    });
    
    console.log("📦 Saved Quiz:", quiz); // ✅ Just log the created quiz directly
    res.status(201).json(quiz); 

  } catch (error) {
    console.error("🚨 Error creating quiz:", error); 
    res.status(500).json({ message: error.message || "Failed to create quiz" });
  }
};

// @desc    Get all quizzes (for dashboard)
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select("title _id"); // only title & ID
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
};

// @desc    Get quizzes created by logged-in user
export const getUserQuizzes = async (req, res) => {
  try {
    const userId = req.userId;
    const quizzes = await Quiz.find({ createdBy: userId });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your quizzes", error });
  }
};

// @desc    Get a quiz by ID (to play)
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select("questions title");
    console.log("📦 Quiz being returned:", quiz); // <<<<< ADD THIS
    res.json({
      title: quiz.title,
      questions: quiz.questions
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Failed to fetch quiz" });
  }
};