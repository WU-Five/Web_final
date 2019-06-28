import React, { createContext, useReducer } from 'react';

const utilContext = createContext();

const initValue = {
	utils: []
};

function reducer(state, action) {
	switch (action.type) {
		case 'GET_UTILS':
			return {
			  ...state,
			  utils: action.payload
			};
		case 'ADD_UTIL':
			return {
			  ...state,
			  utils: [action.payload, ...state.utils]
			};
		default:
			return state;
	}
}

const UtilContextProvider = props => {
	const [ utilstate, dispatch] = useReducer(reducer, initValue);
	return <utilContext.Provider value={{ utilstate, dispatch }}>{props.children}</utilContext.Provider>;
};

export { utilContext, UtilContextProvider };
