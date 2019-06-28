import React, { useState, useContext, useRef } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button ,OverlayTrigger, Tooltip} from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { userContext } from '../context/userIndex';
import axios from 'axios';
import '../stylesheets/Login.css'
const Login = () => {
	const { userstate, dispatch } = useContext( userContext);
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const userError = useRef('');
	const passwordError = useRef('');
	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post('/api/login', { user: user, password: password })
			.then(res => {
				console.log('Login ' + res.data);
				dispatch({ type: 'LOGIN', payload: { user: user, isLogin: true } });
			})
			.catch(err => {
				console.log(err.response.data);
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
		<Container className ="login">
			<h2 className='login-title'>Sign In</h2>
			<Form onSubmit={handleSubmit} >
				<Col md={{ size: 6, offset: 3 }} className='login-user'>
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

				<Col md={{ size: 6, offset: 3 }} className='login-password'>
					<FormGroup row style={{ marginTop: '0px', marginBottom: '0px' }}>
						<Label sm="2">Password</Label>
						<Col sm="10">
							<Input
								placeholder="Enter your password"
								type="password"
								onChange={e => setPassword(e.target.value)}
							/>
							<p style={{ textAlign: 'left', height: '25px', margin: '0px', color: 'red' }} ref={passwordError} />
						</Col>
					</FormGroup>
				</Col>
				<Button type="submit" className='login-button'>
					Submit
				</Button>
				<Button  to={'/register'} tag={NavLink} className='login-button'>
					<span>Register</span>
				</Button>
			</Form>
		</Container>
	);
};

export default Login;
