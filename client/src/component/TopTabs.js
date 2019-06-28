import React, { useContext } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { userContext } from '../context/userIndex';

const TopTabs = () => {
	const { dispatch } = useContext(userContext);
	const handleLogout = () => {
		dispatch({ type: 'LOGOUT', payload: { user: '', isLogin: false } });
	};

	const getisLogin = () => {
		return localStorage.getItem('isLogin') === 'true' ? true : false;
	};



	return (
		<Navbar dark expand="md">
			<NavbarBrand tag={RRNavLink} to="/" className="Home">
				Home
			</NavbarBrand>
			<Nav className="ml-auto" navbar>
				{getisLogin() && (
					<NavItem>
						<NavLink tag={RRNavLink} to="/selfRoom" activeClassName="active">
							SelfRoom
						</NavLink>
					</NavItem>
				)}
				{getisLogin() && (
					<NavItem>
						<NavLink tag={RRNavLink} to="/publicRoom" activeClassName="active">
							PublicRoom
						</NavLink>
					</NavItem>
				)}

				{getisLogin() ? (
					<NavItem>
						<NavLink
							tag={RRNavLink}
							to="/login"
							activeClassName="active"
							onClick={() => {
								handleLogout();
							}}>
							Logout
						</NavLink>
					</NavItem>
				) : (
					<NavItem>
						<NavLink tag={RRNavLink} to="/login" activeClassName="active">
							Login
						</NavLink>
					</NavItem>
				)}
			</Nav>
		</Navbar>
	);
};

export default TopTabs;
