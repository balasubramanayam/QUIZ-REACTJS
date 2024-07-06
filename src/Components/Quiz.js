import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loadQuestions,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  setQuizCompleted,
  toggleFlag,
  clearAnswer,
} from "../State/Actions";

import QuizNavbar from "./QuizNavbar";
import "../Components/Quiz.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors
  const questions = useSelector((state) => state.quiz.questions);
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  const selectedAnswers = useSelector((state) => state.quiz.selectedAnswers);
  const flaggedQuestions = useSelector((state) => state.quiz.flaggedQuestions);

  const [progress, setProgress] = useState(0);
  const [completionStatus, setCompletionStatus] = useState("Not Yet Completed");

  // Effect to load questions initially
  useEffect(() => {
    dispatch(loadQuestions());
  }, [dispatch]);

  // Effect to calculate progress
  useEffect(() => {
    const answeredCount = Object.keys(selectedAnswers).length;
    const totalQuestions = questions.length;
    const calculatedProgress = (answeredCount / totalQuestions) * 100;
    setProgress(calculatedProgress);
  }, [selectedAnswers, questions]);

  // Effect to update completion status
  useEffect(() => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      const status = selectedAnswers.hasOwnProperty(question.question?.questionId) ? "Completed" : "Not Yet Completed";
      setCompletionStatus(status);
    }
  }, [currentQuestionIndex, selectedAnswers, questions]);

  const toggleFlagHandler = (questionId) => {
    dispatch(toggleFlag(questionId));
  };

  const handleAnswer = (questionId, answerId, mark) => {
    dispatch(answerQuestion(questionId, answerId, mark));
  };

  const handleClearAnswer = (questionId) => {
    dispatch(clearAnswer(questionId));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
    } else {
      dispatch(setQuizCompleted());
      navigate("/preview");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      dispatch(previousQuestion());
    }
  };

  const handleSubmitQuiz = () => {
    dispatch(setQuizCompleted());
    navigate("/preview");
  };

  if (!questions || questions.length === 0 || currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion)
  return (
    <div style={{ marginTop: "10%" }} className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <div className="ms-3">    
            <div className="quiz-navbar">
              <QuizNavbar
                questions={questions}
                selectedAnswers={selectedAnswers}
                flaggedQuestions={flaggedQuestions}
                toggleFlag={toggleFlagHandler}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-2 ms-4">
          <div className="question-status">
            <div className="question-details ml-3">
              <h6>Question Id: {currentQuestion.question?.questionId}</h6>
              <h6>{completionStatus}</h6>
              <h6>Marked Out of 1.00</h6>
              <h6 className="flag-action">
                {flaggedQuestions[currentQuestion.question?.questionId] ? (
                  <FontAwesomeIcon
                    icon={faFlagCheckered}
                    color="red"
                    onClick={() => toggleFlagHandler(currentQuestion.question?.questionId)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faFlag}
                    color="gray"
                    onClick={() => toggleFlagHandler(currentQuestion.question?.questionId)}
                  />
                )}
                {flaggedQuestions[currentQuestion.question?.questionId] ? " Unflag" : " Flag"} Question
              </h6>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="quiz-content">
            <div className="quiz-main">
              <h6>Topic Name: {currentQuestion.question?.subtopic?.topic?.topicName}</h6>
              <h6>Sub Topic Name: {currentQuestion.question?.subtopic?.subtopicName}</h6>
              <h4>{currentQuestion.question?.content}</h4>
              <h6>Complexity: {currentQuestion.question?.complexity}</h6>
              <h6>Type: {currentQuestion.question?.questionType}</h6>

              <form>
              {currentQuestion.answer.map((option) => (
                  
                  <div key={option.optionId} className="quiz-option">
                    <input
                      type="radio"
                      id={option.optionId}
                      name="answer"
                      value={option.optionId}
                      onChange={() => handleAnswer(currentQuestion.question?.questionId, option.optionId, option.optionMark)}
                      checked={selectedAnswers[currentQuestion.question?.questionId] === option.optionId}
                    />
                    <label htmlFor={option.optionId}>{option.optionContent}</label>
                  </div>
                ))}
              </form>     

              <div className="quiz-navigation">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous Question
                </button>

                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-sm btn-primary"
                    onClick={handleSubmitQuiz}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    style={{ marginLeft: "15px" }}
                    className="btn btn-sm btn-success"
                    onClick={handleNextQuestion}
                  >
                    Next Question
                  </button>
                )}

                <div className="quiz-clear">
                  <button
                    style={{ marginLeft: "15px" }}
                    className="btn btn-sm btn-danger"
                    onClick={() => handleClearAnswer(currentQuestion.question?.questionId)}
                    disabled={!selectedAnswers[currentQuestion.question?.questionId]}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div className="progress-container">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
