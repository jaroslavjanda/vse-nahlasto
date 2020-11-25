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
            <h1>{ticket?.title}</h1>
            <p align="left">{ticket?.content}</p>
            <Image src="https://picsum.photos/1080/720" />
          </Container>

          <Container className="mt-2">
            <Row>
              <Col style={{ textAlign: 'left', maxWidth: '25px' }}>
                <FontAwesomeIcon icon={faUserCircle} />
              </Col>
              <Col style={{ textAlign: 'left' }}>Name Surname</Col>
            </Row>

            <Form>
              <Form.Group controlId="ControlInput1">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Komentuj zde"
                />
              </Form.Group>
              <Button
                className="pull-right"
                // type="submit"
                variant="success"
                onClick={() => toast.success('Comment added.')}
              >
                Submit
              </Button>
            </Form>
          </Container>

          <Container className="mt-2">
            <Row>
              <Col style={{ textAlign: 'left', maxWidth: '25px' }}>
                <FontAwesomeIcon icon={faUserCircle} />
              </Col>
              <Col style={{ textAlign: 'left' }}>
                Name Surname
                <p style={{ textAlign: 'left', marginTop: '5px' }}>
                  Toto je jiz existujici komentar!
                </p>
              </Col>
            </Row>
          </Container>

          <Container className="mt-2">
            <Row>
              <Col style={{ textAlign: 'left', maxWidth: '25px' }}>
                <FontAwesomeIcon icon={faUserCircle} />
              </Col>
              <Col style={{ textAlign: 'left' }}>
                Name Surname
                <p style={{ textAlign: 'left', marginTop: '5px' }}>
                  Toto je již existující dlouhý komentář. Leave dead animals as
                  gifts sit in window and stare oooh, a bird, yum scoot butt on
                  the rug yet hack sleep all day whilst slave is at work, play
                  all night whilst slave is sleeping. Lick face hiss at owner,
                  pee a lot, and meow repeatedly scratch at fence purrrrrr eat
                  muffins and poutine until owner comes back shred all toilet
                  paper and spread around the house, and meow. Brown cats with
                  pink ears. Meeeeouw and sometimes switches in french and say
                  "miaou" just because well.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};
