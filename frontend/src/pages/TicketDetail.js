import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap';
import { Button } from '../atoms';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const TICKET_DETAIL_QUERY = gql`
  query TicketDetail($ticketId: Int!) {
    ticket(ticketId: $ticketId) {
      user_id
      ticket_id
      title
      date
      image
      content
    }
  }
`;

export const TicketDetail = ({ match }) => {

  const ticketId = parseInt(match.params.ticketId);
  const ticketState = useQuery(TICKET_DETAIL_QUERY, {
    variables: { ticketId },
  });

  const ticket = ticketState.data?.ticket;

  return (
    <div style={{ textAlign: 'center' }}>

      {ticketState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {!ticketState.loading && (
        <div>
          <Container fluid>
            <h1>{ticket.title}</h1>
            <p align="left">{ticket.content}</p>
            <Image src="https://picsum.photos/1080/720" />
            <Row>
              <Col>
                <FontAwesomeIcon icon={faUserCircle} />
              </Col>
              <Col>
                Name Surname
              </Col>
            </Row>

            <Form>
              <Form.Group controlId="ControlInput1">
                <Form.Control as="textarea" rows={3} placeholder="Komentuj zde" />
              </Form.Group>
              <Button className="pull-right"
                      type="submit"
                      variant="success"
                      onClick={() => toast.success('Comment added.')}
              >
                Submit
              </Button>
            </Form>

            <Row>
              <Col>
                <FontAwesomeIcon icon={faUserCircle} />
              </Col>
              <Col>
                Name Surname
              </Col>
            </Row>
            <p>Toto je jiz existujici komentar!</p>
          </Container>
        </div>
      )}
    </div>
  );
};
