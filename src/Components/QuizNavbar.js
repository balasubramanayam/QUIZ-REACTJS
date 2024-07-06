


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextQuestion, previousQuestion } from "../State/Actions";
import { Row, Col } from "react-bootstrap";
import "./QuizNavbar.css";

const QuizNavbar = ({ questions, selectedAnswers, flaggedQuestions }) => {
  const dispatch = useDispatch();

  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );

  const [attemptedQuestions, setAttemptedQuestions] = useState(
    new Array(questions.length).fill(false)
  );

  useEffect(() => {
    setAttemptedQuestions(new Array(questions.length).fill(false));
  }, [questions]);

  const handleQuestionChange = (index) => {
    if (index !== currentQuestionIndex) {
      if (index > currentQuestionIndex) {
        dispatch(nextQuestion());
      } else {
        dispatch(previousQuestion());
      }
    }
  };

  const handleAttemptQuestion = (index) => {
    const updatedAttempts = [...attemptedQuestions];
    updatedAttempts[index] = true;
    setAttemptedQuestions(updatedAttempts);
  };

  return (
    <div className="quiz-navbar">
      <Row className="justify-content-center">
        {questions.map((question, index) => {
          console.log(index)
          const isAnswered = selectedAnswers.hasOwnProperty(
            question.question?.questionId
          );
          const isFlagged = flaggedQuestions[question.question?.questionId];
          const itemClass = isAnswered ? "quiz-button clicked" : "quiz-button";
          const buttonClass = isFlagged ? `${itemClass} flagged` : itemClass;

          return (
            <Col key={index} lg={3}>
              <button
                className={buttonClass}
                onClick={() => {
                  handleQuestionChange(index);
                  handleAttemptQuestion(index);
                }}
              >
                {index + 1}
              </button>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default QuizNavbar;
