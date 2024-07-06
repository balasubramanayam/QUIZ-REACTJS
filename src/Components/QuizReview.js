// // import React, { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";

// // import "./QuizPreview.css";
// // import { useNavigate } from "react-router-dom";

// // const QuizPreview = () => {
// //   const questions = useSelector((state) => state.quiz.questions);

// //   const selectedAnswers = useSelector((state) => state.quiz.selectedAnswers);

// //   const flaggedQuestions = useSelector((state) => state.quiz.flaggedQuestions);

// //   const [completionStatus, setCompletionStatus] = useState("Not Yet Completed");

// //   const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
// //       const questionId = questions[currentQuestionIndex].QuestionId;
// //       const status = selectedAnswers.hasOwnProperty(questionId)
// //         ? "Completed"
// //         : "Not Yet Completed";
// //       setCompletionStatus(status);
// //     }
// //   }, [currentQuestionIndex, selectedAnswers, questions]);

// //   const handleReturn = () => {
// //     navigate("/quiz");
// //   };

// //   return (
// //     <div className="preview-container">
// //       <div className="preview-header">
// //         <h1>Quiz Preview</h1>
// //         <button className="btn btn-sm btn-primary" onClick={handleReturn}>
// //           Back to Quiz
// //         </button>
// //       </div>
// //       <div className="preview-body">
// //         {questions.map((question, index) => (
// //           <div key={question.QuestionId} className="preview-question">
// //             <h3>Question {index + 1}</h3>
// //             <h6>{completionStatus}  {flaggedQuestions[question.QuestionId] ? "🚩" : ""}</h6> 
// //             <h6>Marked Out of 1.00</h6>
            

// //             <br></br>
// //             <h4>{question.Content}</h4>
// //             <ul className="answer-options">
// //               {question.Answers.map((option) => (
// //                 <li key={option.OptionId} className="answer-option">
// //                   <input
// //                     type="radio"
// //                     id={option.OptionId}
// //                     name={`preview-${question.QuestionId}`}
// //                     readOnly
// //                     checked={
// //                       selectedAnswers[question.QuestionId] === option.OptionId
// //                     }
// //                   />
// //                   <label htmlFor={option.OptionId}>
// //                     {option.OptionContent}
// //                   </label>
// //                 </li>
// //               ))}
// //             </ul>

// //             <hr></hr>
// //           </div>
// //         ))}
// //       </div>
// //       <button
// //         style={{ marginLeft: "40%", marginTop: "20px" }}
// //         className="btn btn-sm btn-success "
// //       >
// //         Submit All
// //       </button>
// //     </div>
// //   );
// // };

// // export default QuizPreview;


// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import "./QuizPreview.css";
// import { useNavigate } from "react-router-dom";

// const QuizPreview = () => {
//   const questions = useSelector((state) => state.quiz.questions);
//   const selectedAnswers = useSelector((state) => state.quiz.selectedAnswers);
//   const flaggedQuestions = useSelector((state) => state.quiz.flaggedQuestions);
//   const [completionStatus, setCompletionStatus] = useState("Not Yet Completed");
//   const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
//        const questionId = questions[currentQuestionIndex].QuestionId;
//       const status = selectedAnswers.hasOwnProperty(questionId)
//         ? "Completed"
//         : "Not Yet Completed";
//       setCompletionStatus(status);
//     } 
//   }, [currentQuestionIndex, selectedAnswers, questions]);

//   const handleReturn = () => {
//     navigate("/quiz");
//   };

//   return (
//     <div className="preview-container">
//       <div className="preview-header">
//         <h1>Quiz Preview</h1>
//         <button className="btn btn-sm btn-primary" onClick={handleReturn}>
//           Back to Quiz
//         </button>
//       </div>
//       <div className="preview-body">
//         {questions.map((question, index) => (
//           <div key={question.QuestionId} className="preview-question">
//             <h3>Question {index + 1}</h3>
//             <h6>{completionStatus} {flaggedQuestions[question.QuestionId] ? "🚩" : ""}</h6>
//             <h6>Marked Out of 1.00</h6>

//             <br></br>
//             <h4>{question.Content}</h4>
//             <ul className="answer-options">
//               {question.Answers.map((option) => (
//                 <li key={option.OptionId} className="answer-option">
//                   <input
//                     type="radio"
//                     id={option.OptionId}
//                     name={`preview-${question.QuestionId}`}
//                     checked={
//                       selectedAnswers[question.QuestionId] === option.OptionId
//                     }
//                     readOnly
//                   />
//                   <label htmlFor={option.OptionId}>
//                     {option.OptionContent}
//                   </label>
//                 </li>
//               ))}
//             </ul>

//             <hr></hr>
//           </div>
//         ))}
//       </div>
//       <button
//         style={{ marginLeft: "40%", marginTop: "20px" }}
//         className="btn btn-sm btn-success "
//       >
//         Submit All
//       </button>
//     </div>
//   );
// };

// export default QuizPreview;

// QuizReview.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { resetQuiz } from '../State/Actions'; 

function QuizReview() {
  const dispatch = useDispatch();

  const handleQuizComplete = () => {
    dispatch(resetQuiz());
    alert('Reset completed'); 
  };

  return (
    <div>
      <button className='btn btn-sm btn-success' onClick={handleQuizComplete}>
        Reset All
      </button>
    </div>
  );
}

export default QuizReview;
