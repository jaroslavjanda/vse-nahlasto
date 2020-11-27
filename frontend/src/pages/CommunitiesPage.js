import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { CommunitiesTemplate } from '../templates/CommunitiesTemplate';
import { Spinner } from 'react-bootstrap';
import { ErrorBanner, Button } from 'src/atoms/';

const COMMUNITY_LIST_QUERY = gql`
  query Communities {
    communities {
      community_id
      name
      description
      closed
    }
  }
`;

export const Communities = () => {
  const communitiesState = useQuery(COMMUNITY_LIST_QUERY);
  const [isMember] = useState(false);
  const history = useHistory();
  const communities = communitiesState.data?.communities;

  return (
    <div style={{ textAlign: 'center' }}>
      {communitiesState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!communitiesState.loading && (
        <>
        {communitiesState.error && (
          <ErrorBanner title={communitiesState.error.message}>
            <Button color="red" onClick={() => history.go(0)}>
              Reload
            </Button>
          </ErrorBanner>
        )} 
        {communities && (
          <CommunitiesTemplate communities={communities} isMember={isMember}/>
        )}
        </>
      )}
    </div>
  );
};
