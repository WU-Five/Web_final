import React, { useContext, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { fileContext } from '../context/fileIndex';


const PublicFile = () => {
	const { filestate, dispatch } = useContext(fileContext);

	useEffect(() => {
		axios
			.get(`/api/files`)
			.then(res => {
				dispatch({ type: 'GET_FILES', payload: res.data });
			})
			.catch(err => console.log(err));
	}, [dispatch]);


	const { files } = filestate;
	const isprivate = false;
	return (
		<Container>
			<h2>{localStorage.getItem('name')}</h2>
			<ListGroup>
				{files.map(({ user, name , path}) => (
					<ListGroupItem key={path} className='Selfpdf_list'>
						<span style={{ float: 'left', marginTop: '0.2rem' }}>{`${user}: ${name}`}</span>
						<Button className='edit-btn' to={`/FileRoom/${user}/${path}/${isprivate}`} tag={NavLink}>
							See
						</Button>			
				</ListGroupItem>
				))}
			</ListGroup>			
		</Container>
	);
};

export default PublicFile;
