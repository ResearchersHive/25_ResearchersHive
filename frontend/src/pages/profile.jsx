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
  const username = localStorage.getItem("username")
  const [term, setTerm] = useState({});
  const [paperData, setPaperData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const firstChar = username.charAt(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const updateComment = async(comment) => {
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/comments/updateComment/${comment._id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user:localStorage.getItem("username"),
          text: comment.description, // Assuming 'text' is the field you want to update
        }),
      });
      console.log(comment)
      if (response.ok) {
        const updatedComments = commentData.map((c) =>
          c._id === comment._id ? { ...c, text: comment.description } : c
        );
        console.log(updatedComments)
        setCommentData(updatedComments);
        setShow(false); // Close the modal after successful update
  
        console.log(`Comment with ID ${comment._id} updated successfully`);
        alert('Comment updated successfully'); // Show success message
      } else {
        console.error(`Failed to update comment with ID ${comment._id}`);
        alert('Failed to update comment. Please try again.'); // Show failure message
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      alert('An error occurred while updating the comment. Please try again.'); // Show error message
    }
  };
    
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id")
        const token = localStorage.getItem("token");
        const response = await fetch(`http://127.0.0.1:8000/api/user/${id}/papers`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        
        const data1 = await response.json();
        
        await console.log(data1)
        if (data1["message"] == "Papers : ") {
          const data2 = [
            {
              id: 1,
              title: 'Start Reading...',
              description: 'Enjoy your journey......',
              link: 'http://localhost:5173/dashboard',
            }
          ]
          setPaperData(data2);
          return;
        }
        // const data = []
        
        const data = Object.keys(data1).map( (d)=> ({
            id : d,
            title : data1[d][0],
            description : data1[d][1].substring(9),
            link : "http://localhost:5173/paper/" + d 
        }))
        setPaperData(data);
        const commentResponse = await fetch('http://127.0.0.1:8000/api/comments/getAllComment/',{
          method: 'POST', // or 'POST' or any other HTTP method your API expects
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers if needed
          },
          // Include the userid in the request body
          body: JSON.stringify({
            user: localStorage.getItem("username"), // Replace with the actual user id
          }),
        
        });
        const commentData = await commentResponse.json();
        console.log(commentData)
        setCommentData(commentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
        
    fetchData();
  }, []);

  const handleEditComment = (commentId) => {
    const commentToEdit = commentData.find(comment => comment._id === commentId);
    if (commentToEdit) {
      console.log(commentToEdit);
      setTerm(commentToEdit);
      setShow(true);
      console.log(`Edit comment with ID ${commentId}`);
    } else {
      console.error(`Comment with ID ${commentId} not found`);
    }
  };
  

  const handleDeleteComment = async(commentId) => {
   
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/comments/deleteComment/${commentId}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: 'Abd', // Replace with the actual user id
          }),
        });
    
        if (response.ok) {
          const updatedComments = commentData.filter((c) => c._id !== commentId);
          setCommentData(updatedComments);
    
          console.log(`Comment with ID ${commentId} deleted successfully`);
          alert('Comment deleted successfully');
        } else {
          console.error(`Failed to delete comment with ID ${commentId}`);
          alert('Failed to delete comment. Please try again.');
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert('An error occurred while deleting the comment. Please try again.');
      }
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
                  <Card.Title>{card.paperTitle}</Card.Title>
                  <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {card.text}
                  </Card.Text>
                  <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" onClick={() => handleEditComment(card._id)}>
              Edit
            </Button>
            <Button variant="primary" onClick={() => handleDeleteComment(card._id)}>
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
