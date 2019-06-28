import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ListGroupItem, Button, Modal } from 'reactstrap';
import { videoContext } from '../context/videoIndex';
import Video from './Video';

const DisplayVideos = props => {
	const { user, name, path, pdf_name } = props;
	const { dispatch } = useContext(videoContext);
	const [isOpen, setIsOpen] = useState(false);
	const [videoURL, setVideoURL] = useState(null);

	const deleteFile = () => {
		axios
			.delete(`/api/videos/${user}/${pdf_name}/${path}`)
			.then(res => {
				dispatch({ type: 'DELETE_VIDEO', payload: path });
			})
			.catch(err => console.log(err));
	};

	const getVideo = async () => {
		await axios.get(`/api/videos/${user}/${pdf_name}/${path}`).then(res => {
			setVideoURL(`/api/videos/${user}/${pdf_name}/${path}`);
		});
		setIsOpen(!isOpen);
	};

	return (
		<ListGroupItem>
			<Button className="remove-btn" color="danger" size="sm" onClick={() => deleteFile()}>
				&times;
			</Button>
			<div style={{ float:'left', fontSize: '1rem'}}>{`${user}: ${name}`}</div>
			<Button style={{ marginLeft: '2rem' }} onClick={() => getVideo()}>
				Watch
			</Button>
			<Modal centered isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} size="xl">
				<Video videoURL={videoURL} />
			</Modal>
		</ListGroupItem>
	);
};

export default DisplayVideos;
