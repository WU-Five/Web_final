import React, { useState, useContext } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Context } from '../context';
import axios from 'axios';
const Login = () => {
	const { dispatch } = useContext(Context);
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post('/api/login', { user: user, password: password })
			.then(res => {
				console.log('Login ' + res.data);
				dispatch({ type: 'LOGIN', payload: { user } });
			})
			.catch(err => {
				console.log(err.response.data);
			});
	};
	return (
		<Container>
			<h2>Sign In</h2>
			<Form onSubmit={handleSubmit}>
				<Col sm="12" md={{ size: 6, offset: 3 }}>
					<FormGroup row>
						<Label sm="2">User</Label>
						<Col sm="10">
							<Input placeholder="User name" onChange={e => setUser(e.target.value)} />
						</Col>
					</FormGroup>
				</Col>
				<Col sm="12" md={{ size: 6, offset: 3 }}>
					<FormGroup row>
						<Label sm="2">Password</Label>
						<Col sm="10">
							<Input
								placeholder="Enter your password"
								type="password"
								onChange={e => setPassword(e.target.value)}
							/>
						</Col>
					</FormGroup>
				</Col>
				<Button type="submit" style={{ margin: '10px' }}>
					Submit
				</Button>
				<Button style={{ margin: '10px' }} to={'/register'} tag={NavLink}>
					Register
				</Button>
			</Form>
		</Container>
	);
};

export default Login;
