import React from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../Pages/shared/Footer/Footer';
import Header from '../Pages/shared/Header/Header';
import LeftSideNav from '../Pages/shared/LeftSideNav/LeftSideNav';
import RightSideNav from '../Pages/shared/RightSideNav/RightSideNav';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col lg="2" className="d-none d-lg-block">
                        <LeftSideNav></LeftSideNav>
                    </Col>
                    <Col lg="7">
                        <Outlet></Outlet>
                    </Col>
                    <Col lg="3" className="d-none d-lg-block">
                        <RightSideNav></RightSideNav>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default MainLayout;
