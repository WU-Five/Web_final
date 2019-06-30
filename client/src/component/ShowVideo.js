import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ListGroupItem, Button, Modal, ListGroup } from 'reactstrap';
import { videoContext } from '../context/videoIndex';
import Video from './Video';

const ShowVideo = props => {
	const { user, path, pdf_name, title, user_u } = props;
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
		await axios
			.get(`/api/videos/${user}/${pdf_name}/${path}`)
			.then(res => {
				console.log(`/api/videos/${user}/${pdf_name}/${path}`);
				setVideoURL(`/api/videos/${user}/${pdf_name}/${path}`);
			})
			.catch(err => {
				console.log(`/api/videos/${user}/${pdf_name}/${path}`);
			});
		setIsOpen(!isOpen);
	};

	return (
		<ListGroupItem style={{backgroundColor:'rgb(0,0,0,0)', border:'solid',borderRadius:'1rem',borderColor:'antiquewhite',color:'antiquewhite',width:'90%',left:'6%'}}>
			<div style={{ float: 'left', fontSize: '1rem'}}>{`${user_u}  ${title}`}</div>
			<Button style={{ marginLeft: '2rem' }} onClick={() => getVideo()}>
				Watch
			</Button>
			<Modal centered isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} size="xl">
				<Video videoURL={videoURL} />
			</Modal>
		</ListGroupItem>

	);
};

export default ShowVideo;
