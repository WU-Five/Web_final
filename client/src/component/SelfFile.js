import React, { useContext, useLayoutEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { fileContext } from '../context/fileIndex';

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
		<Container className='container'>
			<div style={{display:'flex'}}>
				<h1 className="Selfpdf_list-title">使用者:</h1>
				<h2 className='Selfpdf_list-name'>{localStorage.getItem('name')}</h2>
			</div>
			<ListGroup style={{border:'none'}} className='Selfpdf_list-group'>
				{files.map(({ user, name, path }) => (
					<div className="Selfpdf_list"><ListGroupItem
						key={path}
						style={{display:'flex',backgroundColor:'initial'}}
						to={`/FileRoom/${user}/${path}/${isprivate}`}
						tag={NavLink}
						
						>
							<span style={{ float: 'left' ,color:'antiquewhite', display:'flex',backgroundColor:'none'}} >{`${user}: ${name}`}</span>
						</ListGroupItem>
					<button className="remove-btn" onClick={() => DeleteFile(user, path)}>
					&times;
					</button></div>
				))}
			</ListGroup>
			{/* <input onChange={handleUpload} type="file" /> */}
		</Container>
	);
};

export default SelfFile;
