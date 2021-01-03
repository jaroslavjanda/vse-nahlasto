import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Button, ErrorBanner } from 'src/atoms/';

import { HomeTemplate } from 'src/templates/HomeTemplate';
import { getDataFromLocalStorage } from '../utils/localStorage';
import { route } from '../Routes';

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
  const localStorage = getDataFromLocalStorage();
  const communitiesState = useQuery(COMMUNITY_LIST_QUERY);
  const [isMember] = useState(false);
  const communitiesHomepage = communitiesState.data?.communitiesHomepage;

  return (
    <div style={{ textAlign: 'center' }}>
      {!localStorage && (
        <>
          {communitiesState.loading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Načítání...</span>
            </Spinner>
          )}
          {!communitiesState.loading && (
            <>
              <HomeTemplate
                communitiesHomepage={communitiesHomepage}
                isMember={isMember}
              />
            </>
          )}
        </>
      )}
      {localStorage && <Redirect to={route.admin()} />}
    </div>
  );
};
