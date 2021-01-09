import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

export function HeadingWithButtons({ header, children }) {
  return (
    <Container fluid className="container-header">
      <Row style={{marginBottom:"50px"}} >
        <div align="center" style={{width:"100%"}}>
          <h1>{header}</h1>
        </div>
        {children && (
          <Col align="center" style={{paddingTop:"7px"}}>{children}</Col>
        )}
      </Row>
    </Container>
  );
}
