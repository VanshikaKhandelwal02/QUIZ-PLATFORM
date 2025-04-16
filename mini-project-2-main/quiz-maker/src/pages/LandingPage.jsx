import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

function LandingPage() {
  const handleCreateQuizClick = () => {
    alert("Please do login or signup first!");
  };

  return (
    <div className="landing-container">
      <header className="navbar">
        <h1 className="logo">Quiz Maker</h1>
        <nav>
          <Link to="/contact" className="btn">Contact Us</Link>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn primary">Sign Up</Link>
        </nav>
      </header>

      <main className="hero">
        <h2>Free Online <span className="highlight">Quiz Maker</span></h2>
        <p>Create and share interactive quizzes easily.</p>
        <button className="cta-btn" onClick={handleCreateQuizClick}>Create a Quiz</button>
      </main>
    </div>
  );
}

export default LandingPage;
