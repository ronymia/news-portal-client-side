import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaWhatsapp, FaDiscord, FaTwitch } from "react-icons/fa";
import ListGroup from 'react-bootstrap/ListGroup';
import BrandCarousel from '../BrandCarousel/BrandCarousel';

const RightSideNav = () => {
    return (
        <section>
            <ButtonGroup vertical className="w-100">
                <Button className='mb-2 w-full' variant="outline-primary">
                    <FaGoogle></FaGoogle> Login with Google
                </Button>
                <Button variant="outline-dark">
                    <FaGithub></FaGithub> Login with Github
                </Button>
            </ButtonGroup>
            <div className="mt-2">
                <h5>Find us on</h5>
                <ListGroup>
                    <ListGroup.Item className="mb-2"><FaFacebook /> Facebook</ListGroup.Item>
                    <ListGroup.Item className="mb-2"><FaWhatsapp /> What's app</ListGroup.Item>
                    <ListGroup.Item className="mb-2"><FaTwitter /> Twitter</ListGroup.Item>
                    <ListGroup.Item className="mb-2"><FaDiscord /> Discord</ListGroup.Item>
                    <ListGroup.Item className="mb-2"><FaTwitch /> Privacy policy</ListGroup.Item>
                </ListGroup>
            </div>
            <div className="mt-2">
                <BrandCarousel />
            </div>
        </section>
    )
}

export default RightSideNav;
