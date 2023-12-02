import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import SelectSearch from "react-select-search";

import './search.css';

const CustomNavbar = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    title: '',
    url: '',
    year: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getOptions = (query) => {
    if (!query) {
      return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8000/api/search/completions?query=${query}`)
        .then((response) => response.json())
        .then(({ matches }) => {
          resolve(matches.map(({ id, title }) => ({ value: id, name: title })));
        })
        .catch(reject);
    });
  };

  const onChange = (id) => {
    fetch(`http://localhost:8000/api/search/details?id=${id}`)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        handleShow();
      })
      .catch(console.error);
  };
  return (
    <header>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body><a href={data.url}>Paper Link</a></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Researchers&rsquo; Hive</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            >
              <Nav.Link href="#action1">Home</Nav.Link>
            </Nav>
            <Nav>
            <SelectSearch getOptions={getOptions} debounce={1000} onChange={onChange} autoComplete="on" search />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default CustomNavbar;
