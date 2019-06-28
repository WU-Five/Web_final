import React, { createContext, useReducer } from 'react';

const answerContext = createContext();

const initValue = {
	answers: []
};

function reducer(state, action) {
	switch (action.type) {
		case 'GET_ANSWERS':
			return {
			  ...state,
			  answers: action.payload
			};
		case 'ADD_ANSWER':
			return {
			  ...state,
			  answers: [action.payload, ...state.answers]
			};
		default:
			return state;
	}
}

const AnswerContextProvider = props => {
	const [ answerstate, answerdispatch] = useReducer(reducer, initValue);
	return <answerContext.Provider value={{ answerstate, answerdispatch }}>{props.children}</answerContext.Provider>;
};

export { answerContext, AnswerContextProvider };
