import React, { useCallback, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { HeadingWithButtons } from 'src/organisms/';
import { Button, Container, Col, Row, Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { imgPathForTicket } from 'src/utils/imgPathForTickets';
import 'src/molecules/CardsTicketStyle.css';

const RESOLVE_TICKET_MUTATION = gql`
  mutation setTicketResolved($ticketId: Int!) {
    setTicketResolved(ticketId: $ticketId) {
      ticket_id
    }
  }
`;

export function TicketsToSolveTemplate({
  ticketsToResolve,
  tickets,
  title,
  isPublic,
  requestDelete,
}) {

    const [resolveTicketRequest] = useMutation(RESOLVE_TICKET_MUTATION, {
        onCompleted: ({ setTicketResolved: ticket_id }) => {
          console.log('Completed', ticket_id);
          window.location.reload();
        },
        onError: ({ setTicketResolved: ticket_id }) => {
          console.log('Error', ticket_id);
        },
      });
    
      const handleResolveTicket = useCallback(
        (oldVariables) => {
          console.log('variables ticketId', oldVariables.variables);
    
          const variables = {
            ticketId: oldVariables.variables.ticket_id,
          };
    
          console.log('new variables', variables.ticket_id);
    
          resolveTicketRequest({ variables });
        },
        [resolveTicketRequest],
      );

  const history = useHistory();
  let sortedTickets = tickets.slice().sort((a, b) => b.ticket_id - a.ticket_id);
  return (
    <Container>
      <HeadingWithButtons header={title ? title : ''}></HeadingWithButtons>

      <Row>
        {sortedTickets.map((tickets) => (
          <Col lg={isPublic ? 4 : 6} md={12}>
<Card
 className="ticketCardMaxSize"
style={{ width: '100%', border: '3px solid rgb(0 123 254)' }}
key={tickets.title}
>
<Card.Img
  style={{ width: '100%' }}
  src={imgPathForTicket('tickets', tickets.image)}
  className="ticketImageNoBorders"
/>
<Card.Header className="ticketCardHeaderBlue">
  <Row>
    <Col align="left">
      <Row className="card-header-items">
          <Button variant="danger" className="btn-sm">
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="f4"
              onClick={() => {
                 requestDelete({
                    variables: {
                      ticketId: tickets.ticket_id,
                      communityId: tickets.community_id,
                      userId: tickets.user_id,
                    },
                  });
                  history.go(0);
              }}
            />
          </Button>

        <Col>
          <div style={{ color: 'white' }} className="badge">
            {tickets.date}
          </div>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Badge>
            {tickets.status}
          </Badge>
        </Col>
      </Row>
    </Col>
  </Row>
</Card.Header>
<Card.Body>
  <h3>{tickets.title}</h3>
  <Card.Text>{tickets.content}</Card.Text>

  <Row>
    <Col xs={2}></Col>
    <Col xs={8}>
      <Button
        variant="success"
        onClick={() => {
          let ticket_id = tickets.ticket_id;
          handleResolveTicket({ variables: { ticket_id } });
        }}
      >
        VYŘEŠIT
      </Button>
    </Col>
  </Row>
</Card.Body>
</Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
