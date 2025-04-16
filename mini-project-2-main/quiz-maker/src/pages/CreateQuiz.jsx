import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateQuiz.css";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    if (!questionText || options.some(opt => opt === "") || !correctAnswer) {
      alert("Please fill all fields and select a correct answer.");
      return;
    }

    const newQuestion = {
      question: questionText,
      options: options,
      correctAnswer: correctAnswer,
    };

    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  const handleSubmitQuiz = async () => {
    // Push latest input if not added manually
    const isCurrentQuestionFilled =
      questionText && options.every((opt) => opt.trim() !== "") && correctAnswer;
  
    const finalQuestions = [...questions];

    console.log("🚨 Pushing question:", {
      question: questionText,
      options: options,
      correctAnswer: correctAnswer
    });
  
    if (isCurrentQuestionFilled) {
      finalQuestions.push({
        question: questionText,
        options: options,
        correctAnswer: correctAnswer,
      });
    
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    }
    
    
    console.log("📤 Final questions before submission:", finalQuestions);
  
    if (!quizTitle || finalQuestions.length === 0) {
      alert("Add quiz title and at least one full question.");
      return;
    }
  
    try {
      console.log("🛫 Submitting quiz with token:", localStorage.getItem("token"));
      console.log("🧾 Payload being sent:", {
        title: quizTitle,
        questions: finalQuestions,
      });

      console.log("🧐 Final questions before submission:", finalQuestions);
    
      const res = await fetch("http://localhost:5050/api/quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: quizTitle,
          questions: finalQuestions.map((q) => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
          })),
        }),
      });
    
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Quiz creation failed");
      alert("✅ Quiz submitted");
      navigate("/your-quiz");
    } catch (err) {
      console.error("❌ Error submitting quiz:", err);
      alert("Submission failed");
    }
    
  };
  
  return (
    <div className="quiz-container">
      <h2>Create Quiz</h2>
      <input
        type="text"
        placeholder="Enter Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="input-field title-input"
      />
      {questions.map((q, index) => (
        <div key={index} className="question-card">
          <p><strong>Q{index + 1}:</strong> {q.question}</p>
          <ul>
            {q.options.map((opt, i) => (
              <li key={i} className={opt === q.correctAnswer ? "correct-option" : ""}>
                {opt}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <input
        type="text"
        placeholder="Enter Question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        className="input-field"
      />
      {options.map((option, index) => (
        <div key={index} className="option-container">
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="input-field"
          />
          <input
            type="radio"
            name="correctAnswer"
            value={option}
            checked={correctAnswer === option}
            onChange={() => setCorrectAnswer(option)}
          /> Correct Answer
        </div>
      ))}
      <button onClick={handleAddQuestion} className="button add-button">
        Add Question
      </button>
      <button onClick={handleSubmitQuiz} className="button submit-button">
        Submit Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;
