import React from 'react';
import { HeadingWithButtons, Tickets } from 'src/organisms/';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { random } from 'lodash';
import { imgPathForTicket } from 'src/utils/imgPathForTickets';

export function MyAddedTicketsTemplate({
  tickets,
  title,
  isOwner
}) {
  const history = useHistory();
  return (
    <Container>
      <HeadingWithButtons header={title ? title : ''}></HeadingWithButtons>

      <Row>
        <Tickets
          tickets={tickets}
          toCommunityButton={true}
          isOwner={isOwner}
        />
      </Row>
    </Container>
  );
}
