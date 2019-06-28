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
		case 'DELETE_UTIL':
			return {
			  ...state,
			  utils: state.files.filter(item => item.path !== action.payload)
			};
		case 'ADD_UTIL':
			return {
			  ...state,
			  utils: [action.payload, ...state.files]
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
