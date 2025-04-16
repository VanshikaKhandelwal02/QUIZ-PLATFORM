import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const quizzes = [
  "React", "HTML", "CSS", "Java", "OOPs", "Python", "JavaScript", 
  "Django", "Node.js", "C", "C++", "Aptitude", "Logical", 
  "Quantitative", "Verbal"
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleQuizClick = (quizName) => {
    navigate(`/quiz/${quizName.toLowerCase()}`);
  };

  const handleCreateQuiz = () => {
    navigate("/create-quiz");
  };

  return (
    <div className="dashboard-container">
      <h2>Available Quizzes</h2>

      {/* Create Quiz Button */}
      <button className="btn-create" onClick={handleCreateQuiz}>
        + Create Quiz
      </button>

      {/* Grid Layout */}
      <div className="quiz-grid">
        {quizzes.map((quiz, index) => (
          <button key={index} className="quiz-item" onClick={() => handleQuizClick(quiz)}>
            {quiz}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
