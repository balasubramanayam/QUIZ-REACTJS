import axios from "axios";
import * as actionTypes from "../State/ActionType";

export const loadQuestions = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/questions");
      console.log(response.data);
      dispatch({ type: actionTypes.LOAD_QUESTIONS, payload: response.data });
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  };
};

export const answerQuestion = (questionId, answerId, mark) => {   
  return {
    type: actionTypes.ANSWER_QUESTION,
    payload: { questionId, answerId, mark },
  };
};

export const nextQuestion = () => {
  return {
    type: actionTypes.NEXT_QUESTION,
  };
};

export const previousQuestion = () => {
  return {
    type: actionTypes.PREVIOUS_QUESTION,
  };
};

export const setQuizCompleted = () => {
  return {
    type: actionTypes.SET_QUIZ_COMPLETED,
  };
};


export const toggleFlag = (questionId) => {
  return {
    type: actionTypes.TOGGLE_FLAG,
    payload: { questionId },
  };
};

export const clearAnswer = (questionId) => {
  return {
    type: actionTypes.CLEAR_ANSWER,
    payload: { questionId },
  };
};

export const resetQuiz = () => ({
  type: actionTypes.RESET_QUIZ,
});