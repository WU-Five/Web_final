import React from 'react';
import DPlayer from 'react-dplayer';
const Video = props => {
	return (
		<DPlayer
			video={{ url: props.videoURL }}
			screenshot={true}
			style={{ backgroundColor: 'white', margin: '5px' }}
			width="1140px"
			height="641.25px"
		/>
	);
};

export default Video;
