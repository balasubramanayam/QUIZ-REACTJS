import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const quizStartedFlag = sessionStorage.getItem('quizStarted');
    if (quizStartedFlag === 'true') {
      setQuizStarted(true);
    } else {
     
      sessionStorage.clear();
    }
  }, []);

  const startQuiz = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setQuizStarted(true);
      sessionStorage.setItem('quizStarted', 'true');
      // Clear any existing sessionStorage related to quiz state
      sessionStorage.removeItem('selectedAnswers');
      sessionStorage.removeItem('flaggedQuestions');
      navigate('/quiz');
    }, 3000);
  };

  return (
    <div>
      <div style={{ marginLeft: '20%', marginTop: '10%' }} className="instructions">
        <h2>Quiz Instructions</h2>
        <p>Welcome to the exam. Please adhere to the following guidelines:</p>
        
        <ol>
          <li>Ensure you are in a quiet and distraction-free environment.</li>
          <li>Position your webcam so your face and your workspace are visible throughout the exam.</li>
          <li>If using a laptop, ensure it is on a stable surface and the webcam is positioned appropriately.</li>
          <li>Keep your student ID or exam authorization handy for verification, if required.</li>
          <li>During the exam, if any technical issues arise, please notify the proctor immediately using the chat function.</li>
          <li>Do not communicate with anyone other than the proctor during the exam.</li>
        </ol>
      
        {!quizStarted ? (
          <Link to="/quiz" className="btn btn-sm btn-success" onClick={startQuiz}>
            Start Quiz
          </Link>
        ) : (
          <Link to="/quiz" className="btn btn-sm btn-success">
            Continue Quiz
          </Link>
        )}
      
        {loading && (
          <div className="d-flex align-items-center text-success">
            <strong>Loading...</strong>
            <div style={{ marginRight: '20%' }} className="spinner-border ms-auto text-success" role="status" aria-hidden="true"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
