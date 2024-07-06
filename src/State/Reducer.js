import * as actionTypes from "./ActionType";

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  score: 0,
  attemptedQuestions: [],
  flaggedQuestions: {},
  selectedAnswers: {},
  quizCompleted: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };

    case actionTypes.ANSWER_QUESTION:
      const { questionId, answerId, mark } = action.payload;
      const updatedAnswers = {
        ...state.answers,
        [questionId]: { answerId, mark },
      };
      const updatedSelectedAnswers = {
        ...state.selectedAnswers,
        [questionId]: answerId,
      };
      const updatedScore = state.score + mark;
      const updatedAttemptedQuestions = [
        ...state.attemptedQuestions,
        questionId,
      ];
      return {
        ...state,
        answers: updatedAnswers,
        selectedAnswers: updatedSelectedAnswers,
        score: updatedScore,
        attemptedQuestions: updatedAttemptedQuestions,
      };

    case actionTypes.CLEAR_ANSWER:
      const { questionId: clearQuestionId } = action.payload;
      const { [clearQuestionId]: omit, ...remainingAnswers } = state.answers;
      const { [clearQuestionId]: omit2, ...remainingSelectedAnswers } =
        state.selectedAnswers;
      const updatedAttemptedQuestionsAfterClear =
        state.attemptedQuestions.filter((qid) => qid !== clearQuestionId);
      return {
        ...state,
        answers: remainingAnswers,
        selectedAnswers: remainingSelectedAnswers,
        attemptedQuestions: updatedAttemptedQuestionsAfterClear,
      };

    case actionTypes.TOGGLE_FLAG:
      const { questionId: flagQuestionId } = action.payload;
      const updatedFlags = {
        ...state.flaggedQuestions,
        [flagQuestionId]: !state.flaggedQuestions[flagQuestionId],
      };
      return {
        ...state,
        flaggedQuestions: updatedFlags,
      };

    case actionTypes.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    case actionTypes.PREVIOUS_QUESTION:
      const prevIndex = state.currentQuestionIndex - 1;
      if (prevIndex < 0) {
        return state;
      }
      return {
        ...state,
        currentQuestionIndex: prevIndex,
      };

    case actionTypes.SET_QUIZ_COMPLETED:
      return {
        ...state,
        quizCompleted: true,
      };

      case actionTypes.RESET_QUIZ:
      return initialState;

    default:
      return state;
  }
};

export default Reducer;
