import React from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { TicketsToSolveTemplate } from '../../templates/TicketsToSolveTemplate';
import { getDataFromLocalStorage } from './../../utils/localStorage';
import { ErrorType } from '../../utils/Error';
import { ErrorBannerWithRefreshButton } from '../../atoms/ErrorBannerWithRefreshButton';
import { Loading } from '../../atoms';

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

export const TicketsToSolve = () => {
  let user = getDataFromLocalStorage()?.user;
  var userId = user ? parseInt(user.user_id) : undefined;
  if (userId === undefined) userId = 0;

  const state = useQuery(TICKETS_TO_RESOLVE, {
    variables: { userId },
  });
  const tickets = state.data?.ticketsToResolve;

  const [deleteRequest] = useMutation(DELETE_MUTATION);

  //TODO delete
  /*
  const [tickets, setTickets] = useState(null);
  useEffect(() => {
    if (!quacksState.loading && quacksState.data != undefined) {
      const data = quacksState.data.ticketsToResolve;
      setTickets(data);
    }
  }, [quacksState]);
  */
  return (
    <div style={{ textAlign: 'center' }}>
      {state.loading && <Loading />}
      {!state.loading && (
        <>
          {state.error && (
            <ErrorBannerWithRefreshButton
              errorType={ErrorType.LOAD_DATA_FAILED}
            />
          )}
          {tickets && (
            <TicketsToSolveTemplate
              tickets={tickets}
              title={'Příspěvky k vyřešení'}
              requestDelete={deleteRequest}
            />
          )}
        </>
      )}
    </div>
  );
};
