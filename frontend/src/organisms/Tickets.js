import React from 'react';
import { CardColumns } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';

import { CardsTicket } from 'src/molecules/CardsTicket'

const LIKE_MUTATION = gql`
  mutation addLike($ownerId: Int!, $ticketId: Int!) {
    addLike(ownerId: $ownerId, ticketId: $ticketId) {
      title
    }
  }
`;

export function Tickets({ tickets }) {

    const [LikedRequest, { data }] = useMutation(LIKE_MUTATION);
    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <CardColumns>
                    {tickets.map((item) => (
                        <CardsTicket key={item.ticket_id} item={item} like={item.likes_count} requestSendLike={LikedRequest} />
                    ))}
                </CardColumns>
            </div>
        </div>
    );
}