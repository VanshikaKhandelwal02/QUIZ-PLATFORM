import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateQuiz from "./pages/CreateQuiz";
import YourQuiz from "./pages/YourQuiz";
import QuizPage from "./pages/QuizPage";
import MongoQuizPage from "./pages/MongoQuizPage";
import ScorePage from "./pages/ScorePage";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/your-quiz" element={<YourQuiz />} />
        <Route path="/quiz/:quizName" element={<QuizPage />} />
        <Route path="/quiz/mongo/:quizId" element={<MongoQuizPage />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
