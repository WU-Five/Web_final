import React, { createContext, useReducer } from 'react';

const Context = createContext();

const initValue = {
	isLogin: false,
	user: '',
};

function reducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, ...action.payload };
		default:
			return state;
	}
}

const UserContextProvider = props => {
	const [state, dispatch] = useReducer(reducer, initValue);
	return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

export { Context, UserContextProvider };
