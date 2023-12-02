import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import CustomNavbar from "../components/Navbar";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { UserApi } from "../utils/requests";

const Dashboard = () => {
  const [paperData, setPaperData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  // const paperData = [
  //   {
  //     id: 1,
  //     title: 'Paper 1',
  //     description: 'AbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstract',
  //     link: 'http://localhost:5173/paper',
  //   },
  //   {
  //     id: 2,
  //     title: 'Paper 2',
  //     description: 'Abstract......',
  //     link: 'http://localhost:5173/paper',
  //   },
  //   {
  //     id: 3,
  //     title: 'Paper 3',
  //     description: 'Abstract......',
  //     link: 'http://localhost:5173/paper',
  //   },
  //   {
  //     id: 4,
  //     title: 'Paper 4',
  //     description: 'Abstract......',
  //     link: 'http://localhost:5173/paper',
  //   },
  //   {
  //     id: 5,
  //     title: 'Paper 5',
  //     description: 'Abstract......',
  //     link: 'http://localhost:5173/paper',
  //   },
  // ];
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("ourApiEndPoint");
        // const data = await response.json();

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
        ];

        setPaperData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    UserApi.getRecommendations()
      .then((data) => {
        console.log(data);
        setRecommendations(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <CustomNavbar />

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
        <h2 style={{margin:'20px'}}>Recommended For You:</h2>
        <Row>
          {recommendations.map((card) => (
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
    </>
  );
};

export default Dashboard;
