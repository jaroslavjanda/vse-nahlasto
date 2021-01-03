import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import { HomeTemplate } from 'src/templates/HomeTemplate';
import { getDataFromLocalStorage } from '../utils/localStorage';
import { Loading } from '../atoms';
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
  const state = useQuery(COMMUNITY_LIST_QUERY);
  const [isMember] = useState(false);
  const communitiesHomepage = state.data?.communitiesHomepage;

  return (
    <div style={{ textAlign: 'center' }}>
      {!localStorage && (
        <>
          {state.loading && (
            (<Loading />)
          )}
          {!state.loading && (
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
