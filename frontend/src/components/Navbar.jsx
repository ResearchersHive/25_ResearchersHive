import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SelectSearch from "react-select-search";
import { useEffect, useRef } from "react";

import './search.css';
import { SearchApi } from "../utils/requests";

const CustomNavbar = () => {
  const getOptions = (query) => {
    if (!query) {
      return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
      SearchApi.search(query).then(({ matches }) => {
        resolve(matches.map(({ id, title }) => ({ value: id, name: title })));
      }).catch(reject);
    });
  };

  const ssRef = useRef();

  // useEffect(() => {
  //   ssRef.current.addEventListener('focus', () => {
  //     console.log('focus');
  //   });
  // }, []);

  const onChange = (id) => {
    window.location.href = `/paper/${id}`;
  };
  return (
    <header>
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
            <SelectSearch ref={ssRef} getOptions={getOptions} debounce={1000} onChange={onChange} autoComplete="on" search />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default CustomNavbar;
