import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import CustomNavbar from "../components/Navbar";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./profile.css"
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ButtonGroup } from "react-bootstrap";

// const Profile  = ({ username }) => {
const Profile  = () => {
  const username = "Username"
  const [term, setTerm] = useState({});
  const [paperData, setPaperData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const firstChar = username.charAt(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const updateComment = (comment) => {
  //   const commentToEdit = commentData.find(comment => comment.id === comment.id);
  //   commentToEdit.description = comment.description
  //   setCommentData(commentToEdit)
  //   setShow(true);
  // }
  const updateComment = (comment) => {
    // console.log(commentData)
    console.log(comment)
    const updatedComments = commentData.map((c) =>
      c.id === comment.id ? { ...c, description: comment.description } : c
    );
    console.log(updatedComments)
    setCommentData(updatedComments);
    
    setShow(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {

        const data = [
          {
            id: 1,
            title: 'Paper 1',
            description: 'Abstract......',
            link: 'http://localhost:5173/paper',
          },
          {
            id: 2,
            title: 'Paper 2',
            description: 'Abstract......',
            link: 'http://localhost:5173/paper',
          },
          {
            id: 3,
            title: 'Paper 3',
            description: 'Abstract......',
            link: 'http://localhost:5173/paper',
          },
          {
            id: 4,
            title: 'Paper 4',
            description: 'Abstract......',
            link: 'http://localhost:5173/paper',
          }
        ];
        
        const commentData = [
          {
            id: 1,
            title: 'Paper 1',
            description: 'Comment......',
            link: 'http://localhost:5173/paper',
          },
          {
            id: 2,
            title: 'Paper 2',
            description: 'Comment......',
            link: 'http://localhost:5173/paper',
          },
          {
            id: 3,
            title: 'Paper 3',
            description: 'Comment......',
            link: 'http://localhost:5173/paper',
          },
          {
            id: 4,
            title: 'Paper 4',
            description: 'Comment......',
            link: 'http://localhost:5173/paper',
          }
        ];

        setPaperData(data);
        setCommentData(commentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditComment = (commentId) => {
    const commentToEdit = commentData.find(comment => comment.id === commentId);
    console.log(commentToEdit)
    setTerm(commentToEdit);
    setShow(true);
    console.log(`Edit comment with ID ${commentId}`);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = commentData.filter((comment) => comment.id !== commentId);
    setCommentData(updatedComments);
    console.log(`Deleted comment with ID ${commentId}`);
  };
  return (
    <>
      <CustomNavbar />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control
            id="commentText"
            type="text"
            value={term.description}
            onChange={(e) => setTerm({ ...term, description: e.target.value })}
        />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => updateComment(term)}>
              Add Comment
            </Button>
        </Modal.Footer>
      </Modal>
    <Container fluid>
    <Row>
        <Col xs={12}>
            <div className="profile-circle">
              {firstChar}
            </div>
            <div className="profile-username">
              {`Hi ${username}`}
            </div>
          </Col>
        </Row>
    </Container>
      <Container fluid>
        <h2 style={{margin:'20px'}}>Recently Read By You:</h2>
        <Row>
          {paperData.map((card) => (
            <Col key={card.id} sm={12} md={6} lg={2}>
              <Card style={{ width: '15rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {card.description}
                  </Card.Text>
                  <Card.Link href={card.link} target="_blank">
                    Continue Reading...
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container fluid>
        <h2 style={{margin:'20px'}}>Comments:</h2>
        <Row>
          {commentData.map((card) => (
            <Col key={card.id} sm={12} md={6} lg={2}>
              <Card style={{ width: '15rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {card.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" onClick={() => handleEditComment(card.id)}>
              Edit
            </Button>
            <Button variant="primary" onClick={() => handleDeleteComment(card.id)}>
              Delete
            </Button>
          </div>
                </Card.Body>
              </Card>
             
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Profile;
