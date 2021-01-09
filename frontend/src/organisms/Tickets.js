import React, { useCallback, useState } from 'react';
import { CardColumns } from 'react-bootstrap';
import { gql, useMutation, useQuery } from '@apollo/client';
import { CardsTicketBody } from '../molecules';
import { getDataFromLocalStorage } from 'src/utils/localStorage';

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

const RESOLVE_TICKET_MUTATION = gql`
  mutation setTicketResolved($ticketId: Int!) {
    setTicketResolved(ticketId: $ticketId) {
      ticket_id
    }
  }
`;


const LIKED_TICKETS = gql`
  query LikedTickets($userId: Int!) {
    ticketsLiked(userId: $userId) {
     ticket_id
    }
  }
`;
 

export function Tickets({ tickets, isOwner, toCommunityButton }) {
  const [sortedTickets, setSortedTickets] = useState(
    tickets.slice().sort((a, b) => b.ticket_id - a.ticket_id)
    )
  let user = getDataFromLocalStorage()?.user;
  var userId = user ? parseInt(user.user_id) : undefined;
  if (userId === undefined) userId = 0;

  const ticketsState = useQuery(LIKED_TICKETS, {
    variables: { userId },
  });
  const ticketsLikedByUser = ticketsState.data?.ticketsLiked;

  const [likedRequest] = useMutation(LIKE_MUTATION);
  const [deleteRequest] = useMutation(DELETE_MUTATION);

  const [resolveTicketRequest] = useMutation(RESOLVE_TICKET_MUTATION, {
    onCompleted: () => {
      window.location.reload();
    },
    onError: ({ setTicketResolved: ticket_id }) => {
      console.log('Error', ticket_id);
    },
  });

  const handleResolveTicket = useCallback(
    (oldVariables) => {
      const variables = {
        ticketId: oldVariables.variables.ticket_id,
      };
      resolveTicketRequest({ variables });
    },
    [resolveTicketRequest],
  );

  return (
    <div style={{ textAlign: 'center' }}>
      {!ticketsState.loading && 
      <div>
        {console.log("Sorted",sortedTickets)}
        <CardColumns style={{ columnCount: '1' }}>
          {sortedTickets.map((item) => (
            <CardsTicketBody
              key={item.ticket_id}
              item={item}
              like={item.likes[0].likes_count}
              likedTickets={ticketsLikedByUser.map(likedTicket => likedTicket.ticket_id)}
              requestSendLike={likedRequest}
              requestDelete={deleteRequest}
              isOwner={isOwner}
              toCommunityButton={toCommunityButton}
              handleResolveTicket={handleResolveTicket}
            />
          ))}
        </CardColumns>
      </div>
}
    </div>
  );
}
