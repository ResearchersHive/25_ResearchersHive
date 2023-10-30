import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import SelectSearch from "react-select-search";
import "./search.css";

const Search = () => {
  // if (!localStorage.getItem("token")) {
  //     window.location.href = "/login";
  // }
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
  }
  return (
    <>
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
      <div className="search">
        <SelectSearch getOptions={getOptions} debounce={1000} onChange={onChange} autoComplete="on" search />
      </div>
    </>
  );
};

export default Search;
