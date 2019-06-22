import React, { createContext, useReducer } from 'react';

const Context = createContext();

const initValue = {
	user: '',
};

function reducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, ...{ user: action.payload.user } };
		default:
			return state;
	}
}

const ContextProvider = props => {
	const [state, dispatch] = useReducer(reducer, initValue);
	return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

export { Context, ContextProvider };
