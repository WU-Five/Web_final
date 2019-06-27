import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { videoContext } from '../context/videoIndex';
import Video from './Video';
import './showVideo.css';

const DisplayVideos = props => {
	const { user, name, path } = props;
	const { dispatch } = useContext(videoContext);
	const [isOpen, setIsOpen] = useState(false);
	const [videoURL, setVideoURL] = useState(null);
	const video = useRef(null);

	const deleteFile = (user, path) => {
		console.log('in');
		axios
			.delete(`/api/videos/${user}/${path}`)
			.then(res => {
				dispatch({ type: 'DELETE_VIDEO', payload: path });
			})
			.catch(err => console.log(err));
	};

	const getVideo = async (user, path) => {
		await axios.get(`/api/videos/${user}/${path}`).then(res => {
			// video.current.src = `/api/videos/${user}/${path}`;
			// console.log(video.current);
			// console.log(document.getElementById('123'));
			setVideoURL(`/api/videos/${user}/${path}`);
		});
		setIsOpen(!isOpen);
	};

	return (
		<ListGroupItem>
			<Button className="remove-btn" color="danger" size="sm" onClick={() => deleteFile(user, path)}>
				&times;
			</Button>
			{`${user}: ${name}`}
			<Button style={{ marginLeft: '5rem' }} onClick={() => getVideo(user, path)}>
				Watch
			</Button>
			<Modal centered isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} size="xl">
				<Video videoURL={videoURL} />
			</Modal>
		</ListGroupItem>
	);
};

export default DisplayVideos;
