import { Container, Image } from 'react-bootstrap';
import { imgPath } from 'src/utils/imgPath';
import React from 'react';

export const TicketDetailContent = ({ ticket }) => {
  return (
    <Container fluid>
      <h1>{ticket.title}</h1>
      <p align="left">{ticket.content}</p>
      {/*TODO ticket image placeholder*/}
      <Image src={imgPath('tickets', ticket.image)} />
    </Container>
  );
};
