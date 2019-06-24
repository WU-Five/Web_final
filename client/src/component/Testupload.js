import React, { useContext } from 'react';
import axios from 'axios';
import { userContext } from '../context/userIndex';
import { fileContext } from '../context/fileIndex';


const Testupload = () => {
	const { userstate } = useContext(userContext);
	const { filestate, dispatch } = useContext(fileContext);
	const _handleUpload = e => {
		const dataForm = new FormData();
		dataForm.append('file', e.target.files[0]);
		axios
			.post(`/api/files/${userstate.user}`, dataForm)
			.then(res => {
				console.log(`Success upload ${res.data.name}`);
				dispatch({ type: 'ADD_FILE', payload: res.data });
			})
			.catch(err => console.log(err));
	};

	return (
		<div>
			<div>{userstate.user}</div>
			<input onChange={_handleUpload} type="file" />
		</div>
	);
};

export default Testupload;
