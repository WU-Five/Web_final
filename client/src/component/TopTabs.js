import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const TopTabs = () => {
	return (
		<>
			<Navbar color="dark" dark expand="md">
				<NavbarBrand tag={RRNavLink} to="/">
					Home
				</NavbarBrand>
				{/* <Collapse navbar> */}
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink tag={RRNavLink} to="/login" activeClassName="active">
							Login
						</NavLink>
					</NavItem>
				</Nav>
				{/* </Collapse> */}
			</Navbar>
		</>
	);
};

export default TopTabs;
