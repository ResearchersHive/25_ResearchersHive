import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './Navbar.css'

const CustomNavbar = () => {

    return (
        <header>
            <Navbar className="navB" expand="lg" variant="dark">
            {/* <Container fluid> */}
                <Navbar.Brand style={{ color: 'aliceblue' }}>Researcher's Hive</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto justify-content-end" style={{ width: "100%" }}>
                        <Nav.Link href="#home">Research</Nav.Link>
                        <Nav.Link href="#link">Publications</Nav.Link>
                        <Nav.Link href="#link">Search</Nav.Link>
                        <Button variant="outline-success">Login</Button>
                    </Nav>
                </Navbar.Collapse>
            {/* </Container> */}
        </Navbar>
        </header>
    )
}

export default CustomNavbar