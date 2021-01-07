import React from 'react'
import { HeadingWithButtons, Tickets } from 'src/organisms/'
import { Container, Row } from 'react-bootstrap'
import 'src/molecules/styles.css'

export function TicketsToSolveTemplate({ tickets, title, isOwner, onCommentSuccess }) {
  return (
    <Container>
      <HeadingWithButtons header={title ? title : ''} />
      <Row>
        <Tickets
          tickets={tickets}
          isOwner={isOwner}
          onCommentSuccess={onCommentSuccess}
        />
      </Row>
    </Container>
  )
}
