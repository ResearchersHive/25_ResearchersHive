import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import CustomNavbar from "../components/Navbar";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

const Paper = () => {
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
    setPaperName("Construction of the Literature Graph in Semantic Scholar");
    setVenueType("conference");
    setVenueName(
      `North American Chapter of the Association for Computational Linguistics`
    );
    setVenueLink("https://www.aclweb.org/portal/naacl");
    setAuthors(
      "Waleed Ammar, Dirk Groeneveld, Chandra Bhagavatula, Iz Beltagy, Miles Crawford, Doug Downey, Jason Dunkelberger, Ahmed Elgohary, Sergey Feldman, Vu A. Ha, Rodney Michael Kinney, Sebastian Kohlmeier, Kyle Lo, Tyler C. Murray, Hsu-Han Ooi, Matthew E. Peters, Joanna L. Power, Sam Skjonsberg, Lucy Lu Wang, Christopher Wilhelm, Zheng Yuan, Madeleine van Zuylen, Oren Etzioni"
    );
    setAbstract(`
        We describe a deployed scalable system for organizing published
        scientific literature into a heterogeneous graph to facilitate
        algorithmic manipulation and discovery. The resulting literature
        graph consists of more than 280M nodes, representing papers,
        authors, entities and various interactions between them (e.g.,
        authorships, citations, entity mentions). We reduce literature
        graph construction into familiar NLP tasks (e.g., entity
        extraction and linking), point out research challenges due to
        differences from standard formulations of these tasks, and report
        empirical results for each task. The methods described in this
        paper are used to enable semantic features in
        www.semanticscholar.org.`);
    setTerms(["literature", "graph", "entity", "describe", "system"]);
    setPaperUrl("https://arxiv.org/pdf/1805.02262.pdf");
    setComment("Hello, World!");
  }, []);
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
              <Button variant="primary" style={{ marginRight: "10px" }}>
                Add Comment
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setComment("");
                }}
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
