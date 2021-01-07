import React from 'react'
import { HeadingWithButtons, Tickets } from 'src/organisms/'
import { Container, Row } from 'react-bootstrap'

export function MyAddedTicketsTemplate({
                                         tickets,
                                         title,
                                         isOwner,
                                       }) {
  return (
    <Container>
      <HeadingWithButtons header={title ? title : ''} />

      <Row>
        <Tickets
          tickets={tickets}
          toCommunityButton={true}
          isOwner={isOwner}
        />
      </Row>
    </Container>
  )
}
