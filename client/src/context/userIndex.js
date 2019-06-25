import React, { createContext, useReducer } from 'react';

const userContext = createContext();

const initValue = {
	isLogin: false,
	user: '',
};

function reducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			localStorage.setItem('name',action.payload.user);
			localStorage.setItem('isLogin',true);
			return { ...state, ...action.payload };
		case 'LOGOUT':
			localStorage.removeItem('name');
			localStorage.setItem('isLogin',false);
			return { ...state, ...action.payload };
		default:
			return state;
	}
}

const UserContextProvider = props => {
	const [userstate, dispatch] = useReducer(reducer, initValue);
	return <userContext.Provider value={{ userstate, dispatch }}>{props.children}</userContext.Provider>;
};

export { userContext, UserContextProvider };
