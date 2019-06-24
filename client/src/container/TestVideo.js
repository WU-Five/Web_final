import React, { useState, useEffect } from 'react';
import RecordRTC from 'recordrtc';

const TestVideo = () => {
	const [recordVideo, setRecordVideo] = useState(null);
	const [screen, setScreen] = useState(null);
	const [audio, setAudio] = useState(null);

	const startRecording = () => {
		console.log('start');
		var constraints = { video: true };
		navigator.mediaDevices
			.getDisplayMedia(constraints)
			.then(screenRes => {
				setScreen(screenRes);
				var video = document.createElement('video');
				video.muted = true;
				video.srcObject = screenRes;
				video.style.display = 'none';
				(document.body || document.documentElement).appendChild(video);
				navigator.mediaDevices.getUserMedia({ audio: true }).then(audioRes => {
					setAudio(audioRes);
					var video = document.createElement('video');
					video.muted = true;
					video.srcObject = audioRes;
					video.style.display = 'none';
					(document.body || document.documentElement).appendChild(video);
					screenRes.width = window.screen.width;
					screenRes.height = window.screen.height;
					screenRes.fullcanvas = true;
					setRecordVideo(
						RecordRTC([screenRes, audioRes], {
							type: 'video',
							mimeType: 'video/webm',
							previewStream: function(s) {
								document.getElementById('video').muted = true;
								document.getElementById('video').srcObject = s;
							},
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
		console.log('stop');
		await recordVideo.stopRecording(() => {
			console.log('stop recording');
			var blob = recordVideo.getBlob();
			document.getElementById('video').srcObject = null;
			document.getElementById('video').src = URL.createObjectURL(blob);
			document.getElementById('video').muted = false;
		});
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
			<video controls autoPlay playsInline width="400" height="300" id="video" />
		</div>
	);
};

export default TestVideo;
