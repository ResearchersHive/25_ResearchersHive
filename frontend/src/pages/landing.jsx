import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './landing.css';
import Card from 'react-bootstrap/Card';


const Landing = () => {
    const navigate = useNavigate();
    const handleRegisterClick = () => {
        navigate('/register');
      };
    return (
        <div className="landing-container">
            <Container className="main-content">
                <Row className="info">
                <Col xs={12} lg={6}>
                <div className="info-text">
                            <h2 style={{ justifyContent: "center" }}>XYZ</h2>
                            <Row xs={2} md={4} lg={6} fluid="false" className="justify-content-middle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            </Row>
                            <br></br>
                            <br></br>
                            <Button type="submit">Know More</Button>
                        </div>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className="info-image">
                        <Image
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/s1B6UkAAAAASUVORK5CYII="
                            alt="Empty placeholder"
                            width={400}
                            height={300}
                            thumbnail
                        />
                        </div>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Container>
                <h2 className="center"> Benefits</h2>
                <div style={{ display: 'flex', marginTop: '2%' }}>
                    <Card style={{ width: '22rem', marginLeft: '2%' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '22rem', marginLeft: '5%' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '22rem', marginLeft: '5%' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '22rem', marginLeft: '5%' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
            <div className="center-div">
        <Button variant="primary" onClick={handleRegisterClick}>Register</Button>
      </div>
        </div>
    );
};

export default Landing;