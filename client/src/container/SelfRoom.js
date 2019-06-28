import React from 'react';
import SelfFile from '../component/SelfFile';
import UploadFile from '../component/UploadFile';
import DisplayVideos from '../component/DisplayVideos';
import Record from '../component/Record';

const SelfRoom = () => {
	return (
		<div>
			<UploadFile />
			<SelfFile />
		</div>
	);
};

export default SelfRoom;
