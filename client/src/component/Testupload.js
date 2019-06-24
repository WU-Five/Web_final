import React, { useContext, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import axios from 'axios';
import { userContext } from '../context/userIndex';
import { fileContext } from '../context/fileIndex';


const Testupload = () => {
	const { userstate } = useContext(userContext);
	const { filestate, dispatch } = useContext(fileContext);

	useEffect(()=>{
		axios
		.get(`/api/files/${userstate.user}`)
		.then(res => {
			dispatch({ type: 'GET_FILES', payload: res.data });
		})
		.catch(err => console.log(err));
	})

	const handleUpload = e => {
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
		<h2>{userstate.user}</h2>
		<ListGroup>
			{files.map(({ user, name , path}) => (
				<ListGroupItem key={path}>
					<Button
						className='remove-btn'
						color='danger'
						size='sm'
						onClick={() => DeleteFile(user,path)}
					>
					&times;
					</Button>
					{`${user}: ${name}`}
				</ListGroupItem>
			))}
		</ListGroup>			
		<input onChange={handleUpload} type="file" />
		</Container>
	);
};

export default Testupload;
