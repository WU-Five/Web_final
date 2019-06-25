import React from 'react';
import SelfFile from '../component/SelfFile';
import UploadFile from '../component/UploadFile';

const SelfRoom = () => {
	return (
		<div>
			<UploadFile/>
			<SelfFile />
		</div>
	);
};

export default SelfRoom;
