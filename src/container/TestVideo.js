import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import RecordRTC from 'recordrtc';
import { userContext } from '../context/userIndex';
import { videoContext } from '../context/videoIndex';

const TestVideo = () => {
	const [recordVideo, setRecordVideo] = useState(null);
	const [screen, setScreen] = useState(null);
	const [audio, setAudio] = useState(null);
	const { userstate } = useContext(userContext);
	const { videostate, dispatch } = useContext(videoContext);

	const startRecording = () => {
		console.log('start');
		var constraints = { video: true };
		navigator.mediaDevices
			.getDisplayMedia(constraints)
			.then(screenRes => {
				setScreen(screenRes);
				navigator.mediaDevices.getUserMedia({ audio: true }).then(audioRes => {
					setAudio(audioRes);
					screenRes.width = window.screen.width;
					screenRes.height = window.screen.height;
					screenRes.fullcanvas = true;
					setRecordVideo(
						RecordRTC([screenRes, audioRes], {
							type: 'video',
							mimeType: 'video/webm',
						})
					);
				});
			})
			.catch(err => {
				console.log(err);
			});
	};
	useEffect(() => {
		if (recordVideo) {
			recordVideo.startRecording();
		}
	}, [recordVideo]);

	const stopRecording = async () => {
		await recordVideo.stopRecording(() => {
			var blob = recordVideo.getBlob();
			const dataForm = new FormData();
			dataForm.append('file', blob);
			axios
				.post(`/api/videos/${userstate.user}`, dataForm)
				.then(res => {
					console.log(res.data);
					console.log(`Success upload video`);
					dispatch({ type: 'ADD_VIDEO', payload: res.data });
				})
				.catch(err => {
					console.log(err);
				});
		});
		[screen, audio].forEach(stream => {
			stream.getTracks()[0].stop();
		});
	};
	const { videos } = videostate;
	return (
		<Container>
			<ListGroup>
				{videos.map(({ user, name, path }, idx) => (
					<ListGroupItem key={path + idx}>
						<Button className="remove-btn" color="danger" size="sm">
							&times;
						</Button>
						{`${user}: ${name}`}
						<Button style={{ marginLeft: '5rem' }}>Watch</Button>
					</ListGroupItem>
				))}
			</ListGroup>
			<div>
				<button onClick={() => startRecording()} id="btn-start-recording">
					start
				</button>
				<button onClick={() => stopRecording()} id="btn-stop-recording">
					stop
				</button>
			</div>
		</Container>
	);
};

export default TestVideo;
