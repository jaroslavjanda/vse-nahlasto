import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import { CommunitiesTemplate } from '../templates/CommunitiesTemplate';
import { Spinner } from 'react-bootstrap';

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

  const communities = communitiesState.data?.communities;

  return (
    <div style={{ textAlign: 'center' }}>
      {communitiesState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!communitiesState.loading && (
        <CommunitiesTemplate communities={communities} isMember={isMember}/>
      )}
    </div>
  );
};
