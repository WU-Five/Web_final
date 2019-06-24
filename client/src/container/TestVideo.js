// import React, { useState, useEffect } from 'react';
// import RecordRTC from 'recordrtc';

// const TestVideo = () => {
// 	const [recordVideo, setRecordVideo] = useState(null);

// 	const requestUserMedia = () => {
// 		console.log('requestUserMedia');
// 		captureUserMedia(stream => {
// 			this.setState({ src: window.URL.createObjectURL(stream) });
// 			console.log('setting state', this.state);
// 		});
// 	};

// 	useEffect(requestUserMedia(), []);
// 	return (
// 		<div>
// 			<button>start</button>
// 			<video controls autoPlay playsInline width="400" height="300" />
// 		</div>
// 	);
// };

// export default TestVideo;
