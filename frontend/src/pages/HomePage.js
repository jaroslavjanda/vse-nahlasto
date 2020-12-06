import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { ErrorBanner, Button } from 'src/atoms/';
import { Redirect } from 'react-router-dom';

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
  const history = useHistory();
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
