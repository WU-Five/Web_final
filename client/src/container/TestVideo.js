import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RecordRTC from 'recordrtc';
import { userContext } from '../context/userIndex';
import { videoContext } from '../context/videoIndex';
import ysFixWebmDuration from 'fix-webm-duration';

const TestVideo = () => {
	const [recordVideo, setRecordVideo] = useState(null);
	const [screen, setScreen] = useState(null);
	const [audio, setAudio] = useState(null);
	const [startTime, setstartTime] = useState(null);
	const { userstate } = useContext(userContext);
	const { dispatch } = useContext(videoContext);

	const startRecording = () => {
		var constraints = { video: true };
		if (!navigator.mediaDevices.getUserMedia && navigator.webkitGetUserMedia) {
			navigator.mediaDevices.getUserMedia = navigator.webkitGetUserMedia;
		}
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
			setstartTime(Date.now());
			recordVideo.startRecording();
			dispatch({ type: 'START_RECORDING', payload: true });
		}
	}, [dispatch, recordVideo]);

	const stopRecording = async () => {
		await recordVideo.stopRecording(() => {
			var blob = recordVideo.getBlob();
			const dataForm = new FormData();
			var duration = Date.now() - startTime;
			ysFixWebmDuration(blob, duration, fixedBlob => {
				dataForm.append('file', fixedBlob);
				axios
					.post(`/api/videos/${userstate.user}`, dataForm)
					.then(res => {
						console.log(`Success upload video`);
						dispatch({ type: 'ADD_VIDEO', payload: res.data });
					})
					.catch(err => {
						console.log(err);
					});
			});
		});
		dispatch({ type: 'END_RECORDING', payload: false });
		[screen, audio].forEach(stream => {
			stream.getTracks()[0].stop();
		});
	};

	return (
		<div>
			<button onClick={() => startRecording()} id="btn-start-recording">
				start
			</button>
			<button onClick={() => stopRecording()} id="btn-stop-recording">
				stop
			</button>
		</div>
	);
};

export default TestVideo;
