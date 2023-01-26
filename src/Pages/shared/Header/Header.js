import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LeftSideNav from '../LeftSideNav/LeftSideNav';
import RightSideNav from '../RightSideNav/RightSideNav';

const Header = () => {
    return (
        <Navbar collapseOnSelect className="mb-4 shadow-sm" expand="lg" bg="body" variant="light">
            <Container>
                <Navbar.Brand><Link to='/'>News portal</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">All News</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#login">Login</Nav.Link>
                    </Nav>
                    <div className='d-lg-none'>
                        <LeftSideNav></LeftSideNav>
                        <RightSideNav></RightSideNav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header;
