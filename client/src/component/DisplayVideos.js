import React, { useContext, useLayoutEffect } from 'react';
import { Container, ListGroup } from 'reactstrap';
import ShowVideo from './ShowVideo';
import { videoContext } from '../context/videoIndex';
import { userContext } from '../context/userIndex';
import axios from 'axios';

const DisplayVideos = () => {
	const { videoState, dispatch } = useContext(videoContext);

	useLayoutEffect(() => {
		axios
			.get(`/api/videos/${localStorage.getItem('name')}`)
			.then(res => {
				dispatch({ type: 'GET_VIDEOS', payload: res.data });
			})
			.catch(err => console.log(err));
	}, [dispatch]);
	return (
		<Container>
			<ListGroup>
				{videoState.videos.map(({ user, name, path, pdf_name }) => (
					<ShowVideo user={user} name={name} path={path} key={path} pdf_name={pdf_name} />
				))}
			</ListGroup>
		</Container>
	);
};

export default DisplayVideos;
