import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { TicketsToSolveTemplate } from '../../templates/TicketsToSolveTemplate';
import { Spinner } from 'react-bootstrap';
import { ErrorBanner, Button } from 'src/atoms/';
import { getDataFromLocalStorage } from './../../utils/localStorage';

const TICKETS_TO_RESOLVE = gql`
  query TicketsToResolve($userId: Int!) {
    ticketsToResolve(userId: $userId) {
      ticket_id
      title
      image
      content
      user_id
      status_id
      community_id
      likes_count
      content
      date
    }
  }
`;

export const TicketsToSolve = () => {
  const { user } = getDataFromLocalStorage();
  const userId = parseInt(user.user_id);
  const history = useHistory();
  const quacksState = useQuery(TICKETS_TO_RESOLVE, {
    variables: { userId },
  });

  const [tickets, setTickets] = useState(null);
  useEffect(() => {
    if (!quacksState.loading && quacksState.data != undefined) {
      const data = quacksState.data.ticketsToResolve;
      setTickets(data);
    }
  }, [quacksState]);
  return (
    <div style={{ textAlign: 'center' }}>
      {console.log(tickets)}
      {quacksState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!quacksState.loading && (
        <>
          {quacksState.error && (
            <ErrorBanner title={quacksState.error.message}>
              <Button color="red" onClick={() => history.go(0)}>
                Načíst znovu
              </Button>
            </ErrorBanner>
          )}
          {tickets && (
            <TicketsToSolveTemplate
              tickets={tickets}
              title={'Příspěvky k vyřešení'}
            />
          )}
        </>
      )}
    </div>
  );
};
