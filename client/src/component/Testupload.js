import React from 'react';
import axios from 'axios';

const Testupload = () => {
	const _handleUpload = e => {
		const dataForm = new FormData();
		dataForm.append('file', e.target.files[0]);
		axios
			.post('/api/files', dataForm)
			.then(res => {
				console.log(res);
				console.log(`Success upload ${res.data}`);
			})
			.catch(err => console.log(err));
	};

	return (
		<div>
			<input onChange={_handleUpload} type="file" />
		</div>
	);
};

export default Testupload;
