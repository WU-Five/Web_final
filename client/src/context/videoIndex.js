import React, { createContext, useReducer } from 'react';

const videoContext = createContext();

const initValue = {
	videos: [],
};

function reducer(state, action) {
	switch (action.type) {
		case 'GET_VIDEOS':
			return {
				...state,
				videos: action.payload,
			};
		case 'DELETE_VIDEO':
			return {
				...state,
				videos: state.videos.filter(item => item.path !== action.payload),
			};
		case 'ADD_VIDEO':
			return {
				...state,
				videos: [action.payload, ...state.videos],
			};
		default:
			return state;
	}
}

const VideoContextProvider = props => {
	const [videostate, dispatch] = useReducer(reducer, initValue);
	return <videoContext.Provider value={{ videostate, dispatch }}>{props.children}</videoContext.Provider>;
};

export { videoContext, VideoContextProvider };
