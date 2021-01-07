import React, { useCallback } from 'react'
import { CardColumns } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'
import { CardsTicketBody } from '../molecules'

const LIKE_MUTATION = gql`
  mutation addLike($ownerId: Int!, $ticketId: Int!) {
    addLike(ownerId: $ownerId, ticketId: $ticketId) {
      title
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deleteTicket($userId: Int!, $communityId: Int!, $ticketId: Int!) {
    deleteTicket(
      userId: $userId
      communityId: $communityId
      ticketId: $ticketId
    ) {
      ticket_id
    }
  }
`

const RESOLVE_TICKET_MUTATION = gql`
  mutation setTicketResolved($ticketId: Int!) {
    setTicketResolved(ticketId: $ticketId) {
      ticket_id
    }
  }
`

export function Tickets({ tickets, isOwner, toCommunityButton }) {
  const [likedRequest] = useMutation(LIKE_MUTATION)
  const [deleteRequest] = useMutation(DELETE_MUTATION)
  let sortedTickets = tickets.slice().sort((a, b) => b.ticket_id - a.ticket_id)

  const [resolveTicketRequest] = useMutation(RESOLVE_TICKET_MUTATION, {
    onCompleted: () => {
      window.location.reload()
    },
    onError: ({ setTicketResolved: ticket_id }) => {
      console.log('Error', ticket_id)
    },
  })

  const handleResolveTicket = useCallback(
    (oldVariables) => {
      const variables = {
        ticketId: oldVariables.variables.ticket_id,
      }
      resolveTicketRequest({ variables })
    },
    [resolveTicketRequest],
  )

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <CardColumns style={{ columnCount: '1' }}>
          {sortedTickets.map((item) => (
            <CardsTicketBody
              key={item.ticket_id}
              item={item}
              like={item.likes[0].likes_count}
              requestSendLike={likedRequest}
              requestDelete={deleteRequest}
              isOwner={isOwner}
              toCommunityButton={toCommunityButton}
              handleResolveTicket={handleResolveTicket}
            />
          ))}
        </CardColumns>
      </div>
    </div>
  )
}
