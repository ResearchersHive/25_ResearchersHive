import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import CustomNavbar from "../components/Navbar";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./profile.css"
import { Card } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { ButtonGroup } from "react-bootstrap";
import AiRewrite from "../components/AiRewrite";
import { CommentsApi, UserApi } from "../utils/requests";

// const Profile  = ({ username }) => {
const Profile  = () => {
  const username = localStorage.getItem("username")
  const [term, setTerm] = useState({});
  const [paperData, setPaperData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const firstChar = username.charAt(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const editorRef = useRef();

  const updateComment = async(comment) => {
    console.log(comment)
    try {
      CommentsApi.update(comment._id, {
        user: localStorage.getItem("username"),
        text: comment.text,
        keyword: comment.keyword,
      }).then(() => {
        const updatedComments = commentData.map((c) =>
          c._id === comment._id ? { ...c, text: comment.text } : c
        );
        console.log(updatedComments)
        setCommentData(updatedComments);
        setShow(false); // Close the modal after successful update
  
        console.log(`Comment with ID ${comment._id} updated successfully`);
        alert('Comment updated successfully'); // Show success message
      });
    } catch (error) {
      console.error("Error updating comment:", error);
      alert('An error occurred while updating the comment. Please try again.'); // Show error message
    }
  };
    
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await UserApi.getPapers();
        
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
            description : data1[d][1],
            link : "http://localhost:5173/paper/" + d 
        }))
        setPaperData(data);
        const commentData = await CommentsApi.getAllComment();
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
        CommentsApi.deleteComment(commentId).then(() => {
          const updatedComments = commentData.filter((c) => c._id !== commentId);
          setCommentData(updatedComments);
    
          console.log(`Comment with ID ${commentId} deleted successfully`);
          alert('Comment deleted successfully');
        });
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
        <AiRewrite ref={editorRef} comment={term.text ?? ''} setComment={(e) => setTerm({ ...term, text: e })} />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => updateComment(term)}>
              Update Comment
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
        <h2 style={{margin:'20px'}}>Recently read by you:</h2>
        <Row className="mx-2" style={{ margin: "-20px 0 0 0" }}>
          {paperData.map((card) => (
            <Col style={{ marginTop: "20px" }}key={card.id} sm={12} md={6} lg={3} xxl={2}>
              <Card style={{ height: "100%" }}>
                <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text className="card-description" style={{ flexGrow: 1 }}>
                    {card.description}
                  </Card.Text>
                  <Card.Link style={{ textDecoration: 'none', }} href={card.link} target="_blank">
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
        <Row className="mx-2 mb-3">
          {commentData.map((card) => (
            <Col key={card.id} sm={12} md={6} lg={3} xxl={2}>
              <Card style={{ height: "100%"  }}>
                <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                  <Card.Title>{card.paperTitle}</Card.Title>
                  <Card.Text className="card-description" style={{ flexGrow: 1 }}>
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
