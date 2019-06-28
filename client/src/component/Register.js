import React, { useState, useContext, useRef } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { userContext } from '../context/userIndex';
import axios from 'axios';
import '../stylesheets/Register.css'

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
		<Container className='register'>
			<h2 className ='register-title'>Register</h2>
			<Form onSubmit={handleSubmit}>
				<Col md={{ size: 6, offset: 3 }} className='register-user'>
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
				<Col  md={{ size: 6, offset: 3 }} className='register-password'>
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
				<Button type="submit"  className='register-button'>
					Submit
				</Button>
				<Button  to="/login" tag={NavLink} className ='register-button'>
					Cancel
				</Button>
			</Form>
		</Container>
	);
};

export default Register;
