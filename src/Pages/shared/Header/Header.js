import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LeftSideNav from '../LeftSideNav/LeftSideNav';
import RightSideNav from '../RightSideNav/RightSideNav';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Button } from 'react-bootstrap';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error));
    }

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
                        <div className="d-flex justify-content-between align-items-center">
                            {
                                user?.uid ?
                                    <>
                                        <span className='me-2'>{user?.displayName}</span>
                                        <Button variant="outline-primary" onClick={handleLogOut}>Log out</Button>
                                    </>
                                    :
                                    <>
                                        <Button variant="outline-success">
                                            <Link to='/login'
                                                className="text-black"
                                            >Login</Link>
                                        </Button>
                                        <Button variant="outline-success"
                                            className="ms-2">
                                            <Link to='/register'
                                                className="text-black"
                                            >Register</Link>
                                        </Button>
                                    </>
                            }
                        </div>
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
