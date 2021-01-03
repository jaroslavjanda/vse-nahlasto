import React from 'react';
import { CardColumns } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';

import { CardsTicket } from 'src/molecules/CardsTicket';

const LIKE_MUTATION = gql`
  mutation addLike($ownerId: Int!, $ticketId: Int!) {
    addLike(ownerId: $ownerId, ticketId: $ticketId) {
      title
    }
  }
`;

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
`;

export function Tickets({ tickets, communityOwner }) {
  const [LikedRequest] = useMutation(LIKE_MUTATION);
  const [deleteRequest] = useMutation(DELETE_MUTATION);

  let sortedTickets = tickets.slice().sort((a, b) => b.ticket_id - a.ticket_id);

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <CardColumns style={{ columnCount: '1' }}>
          {sortedTickets.map((item) => (
            <CardsTicket
              key={item.ticket_id}
              item={item}
              like={item.likes_count}
              requestSendLike={LikedRequest}
              requestDelete={deleteRequest}
              communityOwner={communityOwner}
            />
          ))}
        </CardColumns>
      </div>
    </div>
  );
}
