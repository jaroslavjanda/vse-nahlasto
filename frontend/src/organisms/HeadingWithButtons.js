import React from 'react';

import {
  Container,
  Col,
  Row
} from 'react-bootstrap';

export function HeadingWithButtons({
  header,
  children
}) {
  return (
    <Container fluid className="container-header">
      <Row margin="50px">
        <Col align="left">
          <h1>{header}</h1>
        </Col>
        <Col align="right">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
