import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ make sure this is imported

const QuizDetails = () => {
  const { id } = useParams(); // ✅ FIX: this defines 'id'

  const [quizTitle, setQuizTitle] = useState("");
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/quiz/${id}`);
        const data = await res.json();
        console.log("🐞 Quiz fetched:", data);
        setQuizTitle(data.title);
        setQuizData(data.questions || []);
        console.log("📦 Questions coming from backend:", data.questions);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };
  
    fetchQuiz();
  }, [id]);
  
  return (
    <div className="quiz-details">
      <h2>{quizTitle}</h2>
      {quizData.length === 0 ? (
        <p>No questions available for this quiz.</p>
      ) : (
        quizData.map((q, index) => (
          <div key={index} className="question-card">
            <p>
              <strong>Q{index + 1}:</strong> {q.question}
            </p>
            <ul>
              {q.options.map((opt, i) => (
                <li
                  key={i}
                  className={opt === q.correctAnswer ? "correct-option" : ""}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default QuizDetails;
