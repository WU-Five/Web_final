import React, { useState, useEffect } from 'react';
import PublicFile from '../component/PublicFile';
import axios from 'axios';
import '../stylesheets/PublicRoom.css';

const PublicRoom = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState('');
	useEffect(() => {
		axios.get(`/api/users`).then(res => {
			if (!search) {
				setUsers(user => res.data);
			} else {
				setUsers(user => res.data.filter(user => user.user.includes(search)));
			}
		});
	}, [search]);
	return (
		<>
			<div className="box">
				<div className="container-3">
					<span className="icon">
						<i className="fa fa-search" />
					</span>
					<input
						type="search"
						id="search"
						placeholder="Search user"
						onChange={e => {
							setSearch(e.target.value);
						}}
					/>
				</div>
			</div>
			{users.map((userData, idx) => (
				<PublicFile key={idx} user={userData.user} />
			))}
		</>
	);
};

export default PublicRoom;
