import React, { useCallback }  from 'react';
import { Card, Row, CardDeck, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useMutation, gql } from '@apollo/client';

import {CardsTicket} from 'src/molecules/CardsTicket'

const LIKE_MUTATION = gql`
  mutation addLike($ownerId: Int!, $ticketId: Int!) {
    addLike(ownerId: $ownerId, ticketId: $ticketId) {
      title
    }
  }
`;

export function Tickets({ tickets }) {

  const [LikedRequest, {data}] = useMutation(LIKE_MUTATION);
  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <div>
          <Row>
            {console.log(tickets)}
            <CardDeck>
              {tickets.map((item) => (
                <CardsTicket key={item.ticket_id} item={item} like={item.likes_count} requestSendLike={LikedRequest} />
              ))}
            </CardDeck>
          </Row>
        </div>
      </div>
    </div>
  );
}
