import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

export function HeadingWithButtons({ header, children }) {
  return (
    <Container fluid className="container-header">
      <Row margin="50px">
        <div text-align="center" style={{margin: "auto"}}>
          <h1>{header}</h1>
        </div>
        <Col align="right" style={{paddingTop:"7px"}}>{children}</Col>
      </Row>
    </Container>
  );
}
