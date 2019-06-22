import React, { useState } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Register = () => {
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = e => {
		e.preventDefault();
	};
	return (
		<>
			<Container>
				<h2>Register</h2>
				<Form onSubmit={handleSubmit}>
					<Col sm="12" md={{ size: 6, offset: 3 }}>
						<FormGroup row>
							<Label sm="2">User</Label>
							<Col sm="10">
								<Input
									placeholder="User name"
									onChange={e => {
										setUser(e.target.value);
									}}
								/>
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
									onChange={e => {
										setPassword(e.target.value);
									}}
								/>
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
		</>
	);
};

export default Register;