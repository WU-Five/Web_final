import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RecordRTC from 'recordrtc';
import { videoContext } from '../context/videoIndex';
import ysFixWebmDuration from 'fix-webm-duration';

const Record = props => {
	const { pdf_name, page_num, util_name, Ref } = props;
	const [recordVideo, setRecordVideo] = useState(null);
	const [screen, setScreen] = useState(null);
	const [audio, setAudio] = useState(null);
	const [startTime, setstartTime] = useState(null);
	const [uploadDone, setUploadDone] = useState(false);
	// const { userstate } = useContext(userContext);
	const { videoState, dispatch } = useContext(videoContext);

	useEffect(() => {
		if (recordVideo) {
			setstartTime(Date.now());
			recordVideo.startRecording();
			dispatch({ type: 'START_RECORDING', payload: true });
		}
	}, [dispatch, recordVideo]);

	const getisRecording = () => {
		return videoState.isRecording;
	};

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

	const stopRecording = async () => {
		if (!recordVideo) {
			return;
		}
		await recordVideo.stopRecording(() => {
			var blob = recordVideo.getBlob();
			const dataForm = new FormData();
			var duration = Date.now() - startTime;
			ysFixWebmDuration(blob, duration, fixedBlob => {
				dataForm.append('file', fixedBlob);
				axios
					.post(`/api/videos/${localStorage.getItem('name')}/${pdf_name}/${page_num}/${util_name}`, dataForm)
					.then(res => {
						console.log(`/api/videos/${localStorage.getItem('name')}/${pdf_name}/${page_num}/${util_name}`);
						console.log(`Success upload video`);
						Ref.current = res.data.path;
						setUploadDone(true);
						dispatch({ type: 'ADD_VIDEO', payload: res.data });
					})
					.catch(err => {
						console.log(`/api/videos/${localStorage.getItem('name')}/${pdf_name}/${page_num}/${util_name}`);

						console.log(err);
					});
			});
		});
		dispatch({ type: 'END_RECORDING', payload: false });
		[screen, audio].forEach(stream => {
			stream.getTracks()[0].stop();
		});
		setRecordVideo(null);
	};

	return (
		<div>
			<button type="button"style={{backgroundColor:'black',margin:'0.5rem',color:'antiquewhite',border:'none'}} onClick={() => startRecording() } id="btn-start-recording">
				start
			</button>
			<button type="button"style={{backgroundColor:'black',margin:'0.5rem',color:'antiquewhite',border:'none'}} onClick={() => stopRecording()} id="btn-stop-recording">
				stop
			</button>
			{getisRecording() && (
				<p style={{ textAlign: 'center', height: '1rem', fontSize: '1rem', color: 'red' }}> recording </p>
			)}
			{uploadDone && <p style={{ textAlign: 'center', height: '1rem', fontSize: '1rem', color: 'red' }}> Ok </p>}
		</div>
	);
};

export default Record;
