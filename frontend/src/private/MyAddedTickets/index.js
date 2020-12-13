import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { MyAddedTicketsTemplate } from '../../templates/MyAddedTicketsTemplate';
import { Spinner } from 'react-bootstrap';
import { ErrorBanner, Button } from 'src/atoms/';
import { useAuth } from '../../utils/auth';
import { getDataFromLocalStorage } from './../../utils/localStorage';
import { PreviewType } from '../../molecules/CommunityPreview';

const USERS_TICKETS = gql`
  query UsersTickets($userId: Int!) {
    usersTickets(userId: $userId) {
      ticket_id
      title
      image
      content
      user_id
      status_id
      community_id
    }
  }
`;

export const MyAddedTickets = () => {
  const { user } = getDataFromLocalStorage();
  const userId = parseInt(user.user_id);
  const quacksState = useQuery(USERS_TICKETS, {
    variables: { userId },
  });

  const [tickets, setTickets] = useState(null);
  useEffect(() => {
    if (!quacksState.loading) {
      const data = quacksState.data.usersTickets;
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
            <ErrorBanner title={quacksState.error.message}></ErrorBanner>
          )}
          {tickets && (
            <MyAddedTicketsTemplate
              communities={tickets}
              title={'Vložené příspěvky'}
              previewType={PreviewType.Member}
            />
          )}
        </>
      )}
    </div>
  );
};
