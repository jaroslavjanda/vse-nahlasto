import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Spinner} from 'react-bootstrap';
import { useAuth } from '../utils/auth';

import { CommunityDetailTemplate } from '../templates/CommunityDetailTemplate';

const COMMUNITY_DETAIL_QUERY = gql`
  query CommunityList($communityId: Int!) {
    community(communityId: $communityId) {
      name
      description
      closed
      users {
        user_id
      }
      tickets {
        ticket_id
        title
        content
        likes_count
        comment_count
        status_id
        community_id
        date
        status {
          status
        }
      }
    }
  }
`;

const MEMBERSHIP_QUERY = gql`
  query CommunityOwnerId($communityId: Int!) {
    communityOwnerId(communityId: $communityId)
  }
`;

export const CommunityDetail = ({ match }) => {
  const communityId = parseInt(match.params.communityId);
  const communityState = useQuery(COMMUNITY_DETAIL_QUERY, {
    variables: { communityId },
  });

  const { user } = useAuth();

  const userId = user?.user_id;

  const communityOwnerId = useQuery(MEMBERSHIP_QUERY, {
    variables: { communityId },
  });

  const [isMember, setIsMember] = useState(false);

  const community = communityState.data?.community;

  return (
    <div style={{ textAlign: 'center' }}>
      {communityState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!communityState.loading && (
        <div>
          <CommunityDetailTemplate 
          community={community} 
          isMember={isMember} 
          setIsMember={setIsMember}
          communityId={communityId}
          userId={userId}
          communityOwnerId={communityOwnerId}/>
        </div>
      )}
    </div>
  );
};
