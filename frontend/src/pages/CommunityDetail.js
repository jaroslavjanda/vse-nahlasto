import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { toast } from 'react-toastify';
import { Spinner, Alert, Button } from 'react-bootstrap';
import { tr } from 'date-fns/locale';

const CUMMUNITY_DETAIL_QUERY = gql`
  query CommunityDetail($communityId: Int!) {
    community(communityId: $communityId) {
      name
      closed
      users {
        user_id
      }
      tickets {
        title
      }
    }
  }
`;

export const CommunityDetail = ({ match }) => {

  // Will be seperated to more files, this will be only networking manager
  // Time 😢
  const communityId = parseInt(match.params.communityId);
  const quacksState = useQuery(CUMMUNITY_DETAIL_QUERY, {
    variables: { communityId },
  });

  const [isMember, setIsMember] = useState(false);
  const [community, setCommunity] = useState({
    name: '',
    tickets: [],
    description: '',
    users: [],
  });
  useEffect(() => {
    if (!quacksState.loading) {
      const { name, tickets, users, closed } = quacksState.data.community;
      setCommunity({
        name,
        tickets,
        users,
        closed,
      });
    }
  }, [quacksState]);
  return (
    <div style={{ textAlign: 'center' }}>
      {quacksState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {!quacksState.loading && (
        <div>
          <h1>{community.name}</h1>
          {console.log(community)}
          {!community.closed && !isMember && (
            <div>
              <Alert variant={'success'}>
                <div>Welcome in {community.name} community.</div>
                <div>
                  <strong>This community is open for everyone</strong>
                </div>
              </Alert>
              <Button
                variant="primary"
                onClick={() => {
                  toast.success('Your are in community');
                  setIsMember(true);
                }}
              >
                Join here
              </Button>
            </div>
          )}
          {!community.closed && isMember && (
            <div>
              <Alert variant={'success'}>
                <div>Welcome in {community.name} community.</div>
                <div>
                  <strong>This community is open for everyone</strong>
                </div>
              </Alert>
              <h5>
                Hey bro 👋 <br />
                as a part of community you can see stats <br />
                ⬇️
              </h5>
              <div>
                {console.log(community.users)}
                Number of users: {community.users.length}
              </div>
              <div>Number of tickets: {community.tickets.length}</div>
            </div>
          )}
          {community.closed && (
            <div>
              <Alert variant={'danger'}>
                <div>Community {community.name} require permmision.</div>
                <div></div>
              </Alert>
              <Button
                variant="danger"
                onClick={() => toast.info('Your request was sended')}
              >
                Ask for permission
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
