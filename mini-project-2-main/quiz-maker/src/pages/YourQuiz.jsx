import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const YourQuiz = () => {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5050/api/quiz", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizData(res.data);
      } catch (error) {
        console.error("Failed to fetch quizzes", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>Your Quizzes</h2>
      {quizData.length === 0 ? (
        <p>No quizzes created yet.</p>
      ) : (
        <div className="quiz-list">
          {quizData.map((quiz, index) => (
            <Link key={quiz._id} to={`/quiz/mongo/${quiz._id}`} className="quiz-link">
              <div className="quiz-item">
                <h3>Quiz {index + 1}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourQuiz;
