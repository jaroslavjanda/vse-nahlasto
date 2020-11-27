import { Container, Image } from 'react-bootstrap';
import React from 'react';

export const TicketComment = ({ ticketTitle, ticketContent}) => {
  return (
    <Container fluid>
      <h1>{ticketTitle}</h1>
      <p align="left">{ticketContent}</p>
      <Image src="https://picsum.photos/1080/720" />
    </Container>
  )
}
