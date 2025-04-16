import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/QuizPage.css"; // reuse existing styles

const MongoQuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/quiz/${quizId}`);
        setQuestions(res.data.questions);
      } catch (err) {
        console.error("❌ Failed to fetch quiz:", err);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      alert("✅ Correct Answer!");
    } else {
      alert("❌ Incorrect Answer. Try again!");
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        navigate(
          `/score?quiz=${quizId}&score=${score + (isCorrect ? 1 : 0)}&total=${questions.length}`
        );
      }
    }, 1000);
  };

  return (
    <div className="quiz-container">
      {questions.length === 0 ? (
        <p>No questions available for this quiz.</p>
      ) : (
        <div className="quiz-card">
          <div className="quiz-header">
            <span>
              {currentQuestion + 1} of {questions.length}
            </span>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="quiz-content">
            <h2 className="quiz-question">{questions[currentQuestion].question}</h2>
            <div className="quiz-options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${
                    selectedAnswer === option
                      ? option === questions[currentQuestion].correctAnswer
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MongoQuizPage;
