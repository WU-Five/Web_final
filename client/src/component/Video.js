import React from 'react';
import ReactPlayer from 'react-player';

const Video = props => {
	return <ReactPlayer className="react-player" url={props.videoURL} controls={true} width="1140px" height="641.25px" />;
};

export default Video;
