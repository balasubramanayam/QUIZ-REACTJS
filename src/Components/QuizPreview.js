import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./QuizPreview.css";
import { useNavigate } from "react-router-dom";

const QuizPreview = () => {
  const questions = useSelector((state) => state.quiz.questions);
  const selectedAnswers = useSelector((state) => state.quiz.selectedAnswers);
  const flaggedQuestions = useSelector((state) => state.quiz.flaggedQuestions);
  const navigate = useNavigate();
  const [completionStatuses, setCompletionStatuses] = useState({});

  useEffect(() => {
    const statuses = {};
    questions.forEach((question) => {
      if (selectedAnswers[question.question?.questionId]) {
        statuses[question.question?.questionId] = "Completed";
      } else {
        statuses[question.question?.questionId] = "Not Yet Completed";
      }
    });
    setCompletionStatuses(statuses);
  }, [questions, selectedAnswers]);

  const handleReturn = () => {
    navigate("/quiz");
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1>Quiz Preview</h1>
        <button className="btn btn-sm btn-primary" onClick={handleReturn}>
          Back to Quiz
        </button>
      </div>
      <div className="preview-body">
        {questions.map((question, index) => (
          <div key={question.question?.questionId} className="preview-question">
            <h3>Question {index + 1}</h3>
            <h6>
              {completionStatuses[question.question?.questionId]}{" "}
              {flaggedQuestions[question.question?.questionId] ? "🚩" : ""}
            </h6>
            <h6>Marked Out of 1.00</h6>

            <br></br>
            <h4>{question.Content}</h4>
            <ul className="answer-options">
              {question.answer.map((option) => (
                <li key={option.optionId} className="answer-option">
                  <input
                    type="radio"
                    id={option.optionId}
                    name={`preview-${question.question?.questionId}`}
                    checked={
                      selectedAnswers[question.question?.questionId] === option.optionId
                    }
                    readOnly
                  />
                  <label htmlFor={option.optionId}>
                    {option.optionContent}
                  </label>
                </li>
              ))}
            </ul>

            <hr></hr>
          </div>
        ))}
      </div>
      <button
        style={{ marginLeft: "40%", marginTop: "20px" }}
        className="btn btn-sm btn-success "
      >
        Submit All
      </button>
    </div>
  );
};

export default QuizPreview;
