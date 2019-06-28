import React from 'react';
import SelfFile from '../component/SelfFile';
import UploadFile from '../component/UploadFile';
import DisplayVideos from '../component/DisplayVideos';
import Record from './Record';

const SelfRoom = () => {
	return (
		<div>
			<UploadFile />
			<SelfFile />
			<DisplayVideos />
			<Record />
		</div>
	);
};

export default SelfRoom;
