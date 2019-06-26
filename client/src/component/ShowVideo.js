import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { videoContext } from '../context/videoIndex';
import ModalVideo from 'react-modal-video';

const DisplayVideos = props => {
	const { user, name, path } = props;
	const { dispatch } = useContext(videoContext);
	const [isOpen, setIsOpen] = useState(false);
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

	const getVideo = (user, path) => {
		axios.get(`/api/videos/${user}/${path}`).then(res => {
			console.log('get video');
			video.current.src = `/api/videos/${user}/${path}`;
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
			<Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
				<video src="" controls autoPlay ref={video} width="100%" />
				{/* <ModalVideo channel="youtube" isOpen={isOpen} videoId="L61p2uyiMSo" onClose={() => setIsOpen(!isOpen)} /> */}
			</Modal>
		</ListGroupItem>
	);
};

export default DisplayVideos;
