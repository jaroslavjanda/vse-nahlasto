import { Container, Image } from 'react-bootstrap';
import React from 'react';

export const TicketDetailContent = ({ ticket }) => {
  return (
    <Container fluid>
      <h1>{ticket.title}</h1>
      <p align="left">{ticket.content}</p>
       {/*TODO ticket image placeholder*/}
      <Image src="https://picsum.photos/1080/720" />
    </Container>
  )
}
