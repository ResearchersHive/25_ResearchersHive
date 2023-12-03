/* eslint-disable react/prop-types */
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CustomNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";
import AuthorGraph from "../components/AuthorGraph";
import CitationsGraph from "../components/CitationsGraph";
import ReferencesGraph from "../components/ReferencesGraph";

const Graph = ({ initialPaperId }) => {
  const [graphBy, setGraphBy] = useState("reference"); // author, citation, reference

  return (
    <>
      <CustomNavbar />
      <Container fluid style={{ height: "calc(100vh - 100px)" }} onContextMenu={(e) => e.preventDefault()}>
        <Tabs
          defaultActiveKey="reference"
          onSelect={key => setGraphBy(key)}
          style={{ maxHeight: "50px" }}
        >
          <Tab eventKey="author" title="Author"></Tab>
          <Tab eventKey="citation" title="Citation"></Tab>
          <Tab eventKey="reference" title="Reference"></Tab>
        </Tabs>
        <div style={{ height: "100%", position: "relative" }}>
          {(graphBy === "author") ? (
            <AuthorGraph initialPaperId={initialPaperId} />
          ) : (
            (graphBy === "citation") ? (
              <CitationsGraph initialPaperId={initialPaperId} />
            ) : (
              (graphBy === "reference") ? (
                <ReferencesGraph initialPaperId={initialPaperId} />
              ) : (
                <div></div>
              )
            )
          )}
        </div>
      </Container>
    </>
  );
};

export default Graph;
