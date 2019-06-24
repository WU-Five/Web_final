import React, { useState, useContext, useRef } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { userContext } from '../context/userIndex';
import axios from 'axios';

const Register = () => {
	const { userstate, dispatch } = useContext(userContext);
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const userError = useRef('');
	const passwordError = useRef('');
	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post('/api/register', { user: user, password: password })
			.then(res => {
				console.log(res.data);
				dispatch({ type: 'LOGIN', payload: { user: user, isLogin: true } });
			})
			.catch(err => {
				const { type, msg } = err.response.data;
				if (type === 'user') {
					userError.current.innerHTML = msg;
				} else {
					passwordError.current.innerHTML = msg;
				}
			});
	};
	return userstate.isLogin ? (
		<Redirect to="/selfRoom" />
	) : (
		<Container>
			<h2>Register</h2>
			<Form onSubmit={handleSubmit}>
				<Col sm="12" md={{ size: 6, offset: 3 }}>
					<FormGroup row style={{ marginTop: '10px', marginBottom: '0px' }}>
						<Label sm="2" style={{ textAlign: 'left' }}>
							User
						</Label>
						<Col sm="10">
							<Input
								placeholder="User name"
								onChange={e => {
									setUser(e.target.value);
								}}
								autoFocus={true}
							/>
							<p style={{ textAlign: 'left', height: '25px', margin: '0px', color: 'red' }} ref={userError} />
						</Col>
					</FormGroup>
				</Col>
				<Col sm="12" md={{ size: 6, offset: 3 }}>
					<FormGroup row style={{ marginTop: '0px', marginBottom: '0px' }}>
						<Label sm="2">Password</Label>
						<Col sm="10">
							<Input
								placeholder="Enter your password"
								type="password"
								onChange={e => {
									setPassword(e.target.value);
								}}
							/>
							<p style={{ textAlign: 'left', height: '25px', margin: '0px', color: 'red' }} ref={passwordError} />
						</Col>
					</FormGroup>
				</Col>
				<Button type="submit" style={{ margin: '10px' }}>
					Submit
				</Button>
				<Button style={{ margin: '10px' }} to="/login" tag={NavLink}>
					Cancel
				</Button>
			</Form>
		</Container>
	);
};

export default Register;
