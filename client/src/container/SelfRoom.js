import React from 'react';
import SelfFile from '../component/SelfFile';
import UploadFile from '../component/UploadFile';
import DisplayVideos from '../component/DisplayVideos';
import TestVideo from './TestVideo';

const SelfRoom = () => {
	return (
		<div>
			<UploadFile />
			<SelfFile />
			<DisplayVideos />
			<TestVideo />
		</div>
	);
};

export default SelfRoom;
