import React, { createContext, useReducer } from 'react';

const userContext = createContext();

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
	const [ userstate, dispatch] = useReducer(reducer, initValue);
	return <userContext.Provider value={{ userstate, dispatch }}>{props.children}</userContext.Provider>;
};

export { userContext, UserContextProvider };
