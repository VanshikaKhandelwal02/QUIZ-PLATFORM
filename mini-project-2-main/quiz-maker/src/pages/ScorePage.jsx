import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ScorePage.css";
const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const quizName = queryParams.get("quiz");
  const score = queryParams.get("score");
  const total = queryParams.get("total");

  return (
    <div className="score-container">
      <h2>Quiz Completed! 🎉</h2>
      <p><strong>Quiz Name:</strong> {quizName}</p>
      <p><strong>Your Score:</strong> {score} / {total}</p>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

export default ScorePage;
