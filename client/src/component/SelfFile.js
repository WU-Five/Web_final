import React, { useContext, useLayoutEffect } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { fileContext } from '../context/fileIndex';
import UploadFile from './UploadFile';
import '../stylesheets/SelfRoom.css';
const SelfFile = () => {
	const { filestate, dispatch } = useContext(fileContext);

	useLayoutEffect(() => {
		axios
			.get(`/api/files/${localStorage.getItem('name')}`)
			.then(res => {
				dispatch({ type: 'GET_FILES', payload: res.data });
			})
			.catch(err => console.log(err));
	}, [dispatch]);

	// const handleUpload = e => {
	// 	const dataForm = new FormData();
	// 	dataForm.append('file', e.target.files[0]);
	// 	axios
	// 		.post(`/api/files/${localStorage.getItem('name')}`, dataForm)
	// 		.then(res => {
	// 			console.log(`Success upload ${res.data.name}`);
	// 			dispatch({ type: 'ADD_FILE', payload: res.data });
	// 		})
	// 		.catch(err => console.log(err));
	// };

	const DeleteFile = (user, path) => {
		axios
			.delete(`/api/files/${user}/${path}`)
			.then(res => {
				dispatch({ type: 'DELETE_FILE', payload: path });
			})
			.catch(err => console.log(err));
	};

	const { files } = filestate;
	const isprivate = true;
	return (
		<Container className="container">
			<div className="Selfpdf_list-div">
				<h1 className="Selfpdf_list-title">使用者:</h1>
				<h2 className="Selfpdf_list-name">{localStorage.getItem('name')}</h2>
				<UploadFile />
			</div>
			<ListGroup style={{ border: 'none' }} className="Selfpdf_list-group">
				{files.map(({ user, name, path }) => (
					<div className="Selfpdf_list" key={path}>
						<ListGroupItem
							style={{ display: 'flex', backgroundColor: 'initial', border: '0px' }}
							to={`/FileRoom/${user}/${path}/${isprivate}`}
							tag={NavLink}>
							<span
								style={{
									float: 'left',
									color: 'antiquewhite',
									display: 'flex',
									backgroundColor: 'none',
								}}>{`${name}`}</span>
						</ListGroupItem>
						<button style={{ outline: 'none' }} className="remove-btn" onClick={() => DeleteFile(user, path)}>
							&times;
						</button>
					</div>
				))}
			</ListGroup>
			{/* <input onChange={handleUpload} type="file" /> */}
		</Container>
	);
};

export default SelfFile;
