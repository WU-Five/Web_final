import React, { useState, useEffect } from 'react';
import PublicFile from '../component/PublicFile';
import axios from 'axios';
import '../stylesheets/PublicRoom.css';

const PublicRoom = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		axios.get(`/api/users`).then(res => {
			setUsers(user => res.data);
			console.log(res.data);
		});
	}, []);

	return (
		<>
			<div className="box">
				<div className="container-3">
					<span className="icon">
						<i className="fa fa-search" />
					</span>
					<input type="search" id="search" placeholder="Search..." />
				</div>
			</div>
			{users.map((userData, idx) => (
				<PublicFile key={idx} user={userData.user} />
			))}
		</>
	);
};

export default PublicRoom;
