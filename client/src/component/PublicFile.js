import React, { useState, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const PublicFile = props => {
	const { user } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [files, setFiles] = useState([]);
	useEffect(() => {
		axios
			.get(`/api/files/${user}`)
			.then(res => {
				setFiles(res.data);
			})
			.catch(err => console.log(err));
	}, [user]);
	const isprivate = false;
	return (
		<Container>
			<div className="user_tag" onClick={() => setIsOpen(!isOpen)}>
				<p className="tag_name">User:{user}</p>
				<p className="tag_files">Uploaded Files:{files.length}</p>
			</div>
			<Collapse isOpen={isOpen}>
				<ListGroup>
					{files.map(({ user, name, path }) => (
						<ListGroupItem
							key={path}
							className="Publicpdf_list"
							to={`/FileRoom/${user}/${path}/${isprivate}`}
							tag={NavLink}>
							<span style={{ float: 'left', marginTop: '0.2rem' }}>{`${name}`}</span>
						</ListGroupItem>
					))}
				</ListGroup>
			</Collapse>
		</Container>
	);
};

export default PublicFile;
