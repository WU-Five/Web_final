import React, { useContext, useLayoutEffect } from 'react';
import { Container, ListGroup } from 'reactstrap';
import ShowVideo from './ShowVideo';
import { videoContext } from '../context/videoIndex';
import { userContext } from '../context/userIndex';
import axios from 'axios';

const DisplayVideos = () => {
	const { userstate } = useContext(userContext);
	const { videostate, dispatch } = useContext(videoContext);
	console.log(videostate);
	useLayoutEffect(() => {
		axios
			.get(`/api/videos/${localStorage.getItem('name')}`)
			.then(res => {
				dispatch({ type: 'GET_VIDEOS', payload: res.data });
			})
			.catch(err => console.log(err));
	}, [dispatch, userstate.user]);
	return (
		<Container>
			<ListGroup>
				{videostate.videos.map(({ user, name, path }) => (
					<ShowVideo user={user} name={name} path={path} key={path} />
				))}
			</ListGroup>
		</Container>
	);
};

export default DisplayVideos;
