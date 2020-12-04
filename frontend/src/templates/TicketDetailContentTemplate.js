import React from 'react';
import { TicketDetailContent } from '../molecules'
import { Loading } from '../atoms'
import { gql, useQuery } from '@apollo/client';

const TICKET_DETAIL_QUERY = gql`
  query TicketDetail($ticketId: Int!) {
    ticket(ticketId: $ticketId) {
      user_id
      ticket_id
      title
      date
      image
      content
      community_id
    }
  }
`

export function TicketDetailContentTemplate({ ticketId }) {
    const ticketState = useQuery(TICKET_DETAIL_QUERY, { variables: { ticketId } })
    const ticket = ticketState.data?.ticket
    return (
        <>
        {ticketState.loading && (
            <Loading />
        )}
        {!ticketState.loading && (
            <div className="mw8 center">
                <TicketDetailContent
                ticket={ticket}
                />
            </div>
        )}
    </>
    );
}
