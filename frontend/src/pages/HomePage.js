import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { Spinner } from 'react-bootstrap';
import { ErrorBanner, Button } from 'src/atoms/';

import { HomeTemplate } from 'src/templates/HomeTemplate';

const COMMUNITY_LIST_QUERY = gql`
query Communities {
  communitiesHomepage {
    community_id
    name
    description
    closed
  }
}
`;

export const HomePage = () => {
  const communitiesState = useQuery(COMMUNITY_LIST_QUERY);
  const [isMember] = useState(false);
  const history = useHistory();
  const communitiesHomepage = communitiesState.data?.communitiesHomepage;

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
        {communitiesHomepage && (
          <HomeTemplate communitiesHomepage={communitiesHomepage} isMember={isMember} />
        )}
        </>
      )}
    </div>
  );
};