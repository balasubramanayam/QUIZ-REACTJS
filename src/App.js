import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Quiz from "./Components/Quiz";
import LandingPage from "./Components/LandingPage";
import QuizPreview from "./Components/QuizPreview";
import QuizReview from "./Components/QuizReview";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/quiz" element={<Quiz/>}></Route>
          <Route path="/preview" element={<QuizPreview/>}></Route>
          <Route path="/review" element={<QuizReview/>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
