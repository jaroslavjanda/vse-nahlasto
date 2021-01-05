import React from 'react';
import { HeadingWithButtons, Tickets } from 'src/organisms/';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { random } from 'lodash';
import { imgPathForTicket } from 'src/utils/imgPathForTickets';

export function MyAddedTicketsTemplate({
  tickets,
  title
}) {
  /**
        {tickets.map((tickets) => (
          <Col lg={isPublic ? 4 : 6} md={12}>
            <Card style={{ width: '100%' }} className="myTicket">
              <Card.Img
                variant="top"
                src={imgPathForTicket('tickets', tickets.image)}
              />
              <Card.Body>
                <h3>{tickets.title}</h3>
                <Card.Text>{tickets.content}</Card.Text>
                <div>👍 {random(15)}</div>
                <Button
                  variant="success"
                  onClick={() =>
                    history.push(`/community-detail/${tickets.community_id}`)
                  }
                >
                  Do komunity
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))} */
  const history = useHistory();
  return (
    <Container>
      <HeadingWithButtons header={title ? title : ''}></HeadingWithButtons>

      <Row>
        <Tickets
          tickets={tickets}
        />
      </Row>
    </Container>
  );
}
