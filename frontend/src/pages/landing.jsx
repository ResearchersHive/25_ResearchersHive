import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './landing.css';
import Card from 'react-bootstrap/Card';


const Landing = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const captureChanges = (e) => {
        const { username, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [username]: value,
        }));
    };
    const saveChanges = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/api/login/",
                formData
            );
            console.log(response)
            if (response.data.msg === "Success") {
                const cookies = new Cookies(null, { path: '/' });
                cookies.set('token', response.data.token);

                const modal = document.getElementById("myModal");
                const modalP = document.getElementById("modalPara");
                modalP.innerHTML = "Successfully Logged In!";
                modal.style.display = "block";
                console.log("Login Successful!");
                setTimeout(() => {
                    modal.style.display = "none";

                    if (response.data.role === "scholar") {
                        navigate('/scholar');
                    } else {
                        navigate('/author');
                    }
                }, 2000);

            } else {
                const modal = document.getElementById("myModal");
                const modalP = document.getElementById("modalPara");
                modalP.innerHTML = "Unsuccessful Login : " + response.data.msg;
                modal.style.display = "block";
                console.log("Login Unsuccessful");
                console.log(response.data.msg)
                setTimeout(() => {
                    modal.style.display = "none";
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-end" style={{ width: "100%" }}>
                            <Nav.Link href="#home">Research</Nav.Link>
                            <Nav.Link href="#link">Publications</Nav.Link>
                            <Nav.Link href="#link">Search</Nav.Link>
                            <Button type="submit">Login</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br></br>
            <Container>
                <Row style={{ width: "100%" }}>
                    <Col xs lg="6" className="info">
                        <div>
                            <h2 style={{ justifyContent: "center" }}>XYZ</h2>
                            <Row xs={2} md={4} lg={6} fluid="false" className="justify-content-middle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            </Row>
                            <br></br>
                            <br></br>
                            <Button type="submit">Know More</Button>
                        </div>
                    </Col>
                    <Col xs lg="6" className="imge">
                        <Image
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/s1B6UkAAAAASUVORK5CYII="
                            alt="Empty placeholder"
                            width={400}
                            height={300}
                            thumbnail
                        />
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
            <br></br>
            <Button className="center-div"> Register</Button>
            <br></br>
        </div>
    );
};

export default Landing;