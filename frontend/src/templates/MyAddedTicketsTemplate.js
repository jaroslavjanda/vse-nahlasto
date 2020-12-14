import React from 'react';
import { route } from 'src/Routes';
import { HeadingWithButtons } from 'src/organisms/';
import { Button, Container, Col, Row, Card } from 'react-bootstrap';
import { imgPath } from 'src/utils/imgPath';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { random } from 'lodash';
export function MyAddedTicketsTemplate({
  usersTickets,
  tickets,
  title,
  isPublic,
}) {
  const history = useHistory();
  return (
    <Container>
      <HeadingWithButtons header={title ? title : ''}>
      </HeadingWithButtons>

      <Row>
        {tickets.map((tickets) => (
          <Col lg={isPublic ? 4 : 6} md={12}>
                <Card style={{ width: '100%' }}>
                      <Card.Img
                        variant="top"
                        src={imgPath('tickets', tickets.image)}
                      />
                      <Card.Body>
                        <h3>{tickets.title}</h3>
                        <Card.Text>{tickets.content}</Card.Text>
                        <div>👍 {random(15)}</div>
                      </Card.Body>
                    </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
