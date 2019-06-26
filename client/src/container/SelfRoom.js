import React from 'react';
import SelfFile from '../component/SelfFile';
import UploadFile from '../component/UploadFile';
import DisplayVideos from '../component/DisplayVideos';

const SelfRoom = () => {
	return (
		<div>
			<UploadFile />
			<SelfFile />
			<DisplayVideos />
		</div>
	);
};

export default SelfRoom;
