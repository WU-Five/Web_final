import React, { createContext, useReducer } from 'react';

const fileContext = createContext();

const initValue = {
	files: []
};

function reducer(state, action) {
	switch (action.type) {
		case 'GET_FILES':
			return {
			  ...state,
			  files: action.payload
			};
		case 'DELETE_FILE':
			return {
			  ...state,
			  files: state.files.filter(item => item._id !== action.payload)
			};
		case 'ADD_FILE':
			return {
			  ...state,
			  files: [action.payload, ...state.files]
			};
		default:
			return state;
	}
}

const FileContextProvider = props => {
	const [ filestate, dispatch] = useReducer(reducer, initValue);
	return <fileContext.Provider value={{ filestate, dispatch }}>{props.children}</fileContext.Provider>;
};

export { fileContext, FileContextProvider };
