import { Container, Image } from 'react-bootstrap';
import { imgPathForTicket } from 'src/utils/imgPathForTickets';
import React from 'react';

export const TicketDetailContent = ({ ticket }) => {
  return (
    <Container fluid>
      <h1>{ticket.title}</h1>
      <p align="left">{ticket.content}</p>
      {/*TODO ticket image placeholder*/}
      <Image src={imgPathForTicket('tickets', ticket.image)} />
    </Container>
  );
};
