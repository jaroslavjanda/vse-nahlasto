import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { TicketsToSolveTemplate } from '../../templates/TicketsToSolveTemplate';
import { getDataFromLocalStorage } from './../../utils/localStorage';
import { ErrorType } from '../../utils/Error';
import { ErrorBannerWithRefreshButton } from '../../atoms/ErrorBannerWithRefreshButton';
import { Loading } from '../../atoms';
import { Alert } from 'react-bootstrap';

const TICKETS_TO_RESOLVE = gql`
  query TicketsToResolve($userId: Int!) {
    ticketsToResolve(userId: $userId) {
      ticket_id
      title
      image
      content
      user_id
      status {
        status
        status_id
        code_class
      }
      comments {
        comment_id
        content
      }
      likes {
        ticket_id
        likes_count
        likes_users {
          user_id
        }
      }
      community_id
      content
      date
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
          {tickets.length ? (
            <TicketsToSolveTemplate
              tickets={tickets}
              title={'Příspěvky k vyřešení'}
              isOwner={true}
            />
          ) : (
            <div style={{marginTop:"3rem"}}>
              <Alert variant={'success'}>
                Všechny Vaše příspěvky byly vyřešeny. &#9745;
              </Alert>
            </div>
          )}
        </>
      )}
    </div>
  );
};
