import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { MyAddedTicketsTemplate } from '../../templates/MyAddedTicketsTemplate';
import { getDataFromLocalStorage } from './../../utils/localStorage';
import { ErrorType } from '../../utils/Error';
import { ErrorBannerWithRefreshButton } from '../../atoms/ErrorBannerWithRefreshButton';
import { Loading } from '../../atoms';

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
  let user = getDataFromLocalStorage()?.user;
  var userId = user? parseInt(user.user_id):undefined;
  if (userId === undefined) userId = 0;
  
  const state = useQuery(USERS_TICKETS, {
    variables: { userId },
  });
  const tickets = state.data?.usersTickets;
  //TODO Delete
  /*
  const [tickets, setTickets] = useState(null);
  useEffect(() => {
    if (!quacksState.loading && quacksState.data != undefined) {
      const data = quacksState.data.usersTickets;
      setTickets(data);
    }
  }, [quacksState]);*/
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
            <MyAddedTicketsTemplate
              tickets={tickets}
              title={'Vložené příspěvky'}
            />
          )}
        </>
      )}
    </div>
  );
};
