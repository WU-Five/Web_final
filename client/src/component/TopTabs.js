import React, { useContext } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { userContext } from '../context/userIndex';

const TopTabs = () => {
	const { userstate, dispatch } = useContext(userContext);

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT', payload: { user: '', isLogin: false } });
	};

	return (
		<Navbar color="dark" dark expand="md">
			<NavbarBrand tag={RRNavLink} to="/">
				Home
			</NavbarBrand>
			{/* <Collapse navbar> */}
			<Nav className="ml-auto" navbar>
				{userstate.isLogin && (
					<NavItem>
						<NavLink tag={RRNavLink} to="/selfRoom" activeClassName="active">
							SelfRoom
						</NavLink>
					</NavItem>
				)}
				{userstate.isLogin && (
					<NavItem>
						<NavLink tag={RRNavLink} to="/publicRoom" activeClassName="active">
							PublicRoom
						</NavLink>
					</NavItem>
				)}
									
				{userstate.isLogin ? (
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
			{/* </Collapse> */}
		</Navbar>
	);
};

export default TopTabs;
