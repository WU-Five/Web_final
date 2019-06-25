import React, { useContext, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { fileContext } from '../context/fileIndex';


const SelfFile = () => {
	// const { userstate } = useContext(userContext);
	const { filestate, dispatch } = useContext(fileContext);

	useEffect(()=>{
		axios
		.get(`/api/files/${localStorage.getItem('name')}`)
		.then(res => {
			dispatch({ type: 'GET_FILES', payload: res.data });
		})
		.catch(err => console.log(err));
	})

	const handleUpload = e => {
		const dataForm = new FormData();
		dataForm.append('file', e.target.files[0]);
		axios
			.post(`/api/files/${localStorage.getItem('name')}`, dataForm)
			.then(res => {
				console.log(`Success upload ${res.data.name}`);
				dispatch({ type: 'ADD_FILE', payload: res.data });
			})
			.catch(err => console.log(err));
	};

	const DeleteFile = (user,path) => {
		axios
		.delete(`/api/files/${user}/${path}`)
		.then(res => {
			dispatch({ type: 'DELETE_FILE', payload: path });
		})
		.catch(err => console.log(err));
	}


	const { files } = filestate;
	return (
		<Container>
			<h2>{localStorage.getItem('name')}</h2>
			<ListGroup>
				{files.map(({ user, name , path}) => (
					<ListGroupItem key={path} className='Selfpdf_list'>
						<span style={{ float: 'left', marginTop: '0.2rem' }}>{`${user}: ${name}`}</span>
						<Button
							className='remove-btn'
							color='danger'
							size='sm'
							onClick={() => DeleteFile(user,path)}
						>
						&times;
						</Button>	
						<Button className='edit-btn' to={`/FileRoom/${user}/${path}`} tag={NavLink}>
							Edit
						</Button>			
				</ListGroupItem>
				))}
			</ListGroup>			
			{/* <input onChange={handleUpload} type="file" /> */}
		</Container>
	);
};

export default SelfFile;