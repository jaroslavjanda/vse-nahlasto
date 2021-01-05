import React from 'react'
import { HeadingWithButtons, Tickets } from 'src/organisms/'
import { Container, Row } from 'react-bootstrap'
import 'src/molecules/styles.css'

export function TicketsToSolveTemplate({ tickets, title, userOwner }) {
  return (
    <Container>
      <HeadingWithButtons header={title ? title : ''}></HeadingWithButtons>
      <Row>
        <Tickets
            tickets={tickets}
            communityOwner={userOwner}
          />
      </Row>
    </Container>
  )
}
