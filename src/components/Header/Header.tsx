import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Header.css"

const Header = () => {
  return (
    <Container>
      <Row>
        <h1 className="title">
          TFT trainer
        </h1>
      </Row>
    </Container>
  )
}

export default Header;