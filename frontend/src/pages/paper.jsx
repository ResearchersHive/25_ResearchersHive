import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import CustomNavbar from "../components/Navbar";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserApi } from "../utils/requests";

const Paper = () => {
  const { id } = useParams();
  const [paperName, setPaperName] = useState("");
  const [venueType, setVenueType] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueLink, setVenueLink] = useState("");
  const [authors, setAuthors] = useState("");
  const [abstract, setAbstract] = useState("");
  const [terms, setTerms] = useState([]);
  const [paperUrl, setPaperUrl] = useState("");
  const [comment, setComment] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    UserApi.getPaper(id).then((response) => {
      console.log(response);
      setPaperName(response.title);
      setVenueType(response.venue_type);
      setVenueName(response.venue_name);
      setVenueLink(response.venue_link);
      setAuthors(response.authors);
      setAbstract(response.abstract);
      setTerms(response.keywords.split(","));
      setPaperUrl(response.paperPdf);
      if ("comment" in response) {
        setComment(response.comment);
      }
      
    });

    
  }, []);

  useEffect(()=>{
    const callAlert=async ()=>{
      try {
        // Replace 'your-alert-api-endpoint' with the actual endpoint
        const response = await fetch('http://127.0.0.1:8000/api/alert/getalert', {
          method: 'POST', // or 'GET' or any other HTTP method
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: localStorage.getItem("username"),
            keyword:terms.join(','),  // Replace with the actual user id
          }),
        });

        if (response.ok) {
          console.log('Alert API called successfully');
        } else {
          console.error('Failed to call Alert API');
        }
      } catch (error) {
        console.error('Error calling Alert API:', error);
      }
    };

    callAlert();
  },[terms]);
 const addComment = async(id,terms) => {
   
  try {
    const token = localStorage.getItem("token");
    const response = await fetch('http://127.0.0.1:8000/api/comments/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        paper_id:id,
        user: localStorage.getItem("username"),
        text:comment,
        keyword:terms.join(','),  // Replace with the actual user id
      }),
    });
    if (response.ok) {
      console.log('Comment added successfully');
      alert('Comment added successfully');
      // You can update the UI or perform any other actions after a successful comment submission
    } else {
      console.error('Failed to add comment');
      alert('Failed to add comment. Please try again.');
    }
  } catch (error) {
    console.error('Error adding comment:', error);
    alert('An error occurred while adding the comment. Please try again.');
  }
};
  return (
    <>
      <CustomNavbar />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Terms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {terms.map((term, i) => (
            <Stack key={i} direction="horizontal" gap={2} className="mb-2">
              <Form.Control
                id={`text${i}`}
                type="text"
                value={term}
                onChange={(e) => {
                    const newTerms = [...terms];
                    newTerms[i] = e.target.value;
                    setTerms(newTerms);
                }}
              ></Form.Control>
              <Button variant="outline-danger"
                onClick={() => {
                  const termsArray = [...terms];
                  const idx = termsArray.indexOf(term);
                  if (idx > -1) {
                    termsArray.splice(idx, 1);
                  }
                  setTerms(termsArray);
                }}
              >
                Delete
              </Button>
            </Stack>
          ))}
          <Button
            className="w-100"
            onClick={() => {
              const newTerms = [...terms].concat([""]);
              setTerms(newTerms);
            }}
          >
            Add Term
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Container fluid>
        <Row style={{ margin: "10px" }}>
          <Col style={{ maxHeight: "calc(100vh - 100px)", overflow: "scroll" }}>
            <h1 className="mt-3">{paperName}</h1>
            <div className="mt-3">
              <Badge bg="primary">{venueType}</Badge>
            </div>
            <h5 className="mt-3">
              <a target="blank" href={venueLink}>{venueName}</a>
            </h5>
            <h3 className="mt-3">Authors</h3>
            <p>{authors}</p>
            <h3 className="mt-3">Abstract</h3>
            <p>{abstract}</p>
            <h3 className="mt-3">
              Terms
              <Button style={{ float: "right" }} onClick={handleShow}>
                Edit
              </Button>
            </h3>
            <Stack direction="horizontal" gap={2}>
              {terms.map((term, i) => (
                <Badge key={i}>{term}</Badge>
              ))}
            </Stack>
            <h3 className="mt-3">Comments</h3>
            <Form>
              <Form.Group className="mb-3" controlId="commentsTextarea">
                <Form.Label>Enter comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" style={{ marginRight: "10px" }} onClick={() => addComment(id,terms)}>
                Add Comment
              </Button>
              <Button
                variant="primary"
               // onClick={() => handleEditComment(card._id)}
              >
                Clear
              </Button>
            </Form>
          </Col>
          <Col style={{ height: "calc(100vh - 100px)", margin: "10px" }}>
            <iframe src={paperUrl} width="100%" height="100%"></iframe>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Paper;
