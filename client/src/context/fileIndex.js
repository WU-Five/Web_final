import React, { createContext, useReducer } from 'react';

const Context = createContext();

const initValue = {
	file: '',
};

function reducer(state, action) {
	switch (action.type) {
		default:
			return state;
	}
}

const FileContextProvider = props => {
	const [state, dispatch] = useReducer(reducer, initValue);
	return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

export { Context, FileContextProvider };
