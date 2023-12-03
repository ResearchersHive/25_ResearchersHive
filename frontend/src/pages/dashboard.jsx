import { Col, Container, Row } from "react-bootstrap";
import CustomNavbar from "../components/Navbar";
import { Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { FeaturesApi, UserApi } from "../utils/requests";

const Dashboard = () => {
  const [paperData, setPaperData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [conferences, setConferences] = useState([]);
  
  const handleLinkClick = (event) => {
    event.preventDefault();
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
            description : data1[d][1].substring(9),
            link : "http://localhost:5173/paper/" + d 
        }))
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

    FeaturesApi.conferences()
      .then((data) => {
        console.log(data);
        setConferences(data);
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
        <h2 style={{margin:'20px'}}>Recommended For You:</h2>
        <Row>
          {recommendations.map((card) => (
            <Col key={card.paperId} sm={12} md={6} lg={2}>
              <Card style={{ width: '15rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {card.abstract}
                  </Card.Text>
                  <a href={"http://localhost:5173/paper/" + card.paperId} target="_self" >Continue Reading...</a>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container fluid>
        <h2 style={{margin:'20px'}}>Conferences:</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Conference Name</th>
              <th>Deadline</th>
              <th>Venue</th>
              <th>Conference Link</th>
            </tr>
          </thead>
          <tbody>
            {conferences.map((conference, i) => (
              <tr key={conference.conference_id}>
                <td>{i + 1}</td>
                <td>{conference.conference_name}</td>
                <td>{conference.deadline}</td>
                <td>{conference.venue}</td>
                <td><a href={`http://www.wikicfp.com${conference.conference_link}`} rel="noreferrer" target="_blank">Link</a></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Dashboard;
