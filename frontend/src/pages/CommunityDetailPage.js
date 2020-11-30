import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Spinner} from 'react-bootstrap';
import { useAuth } from '../utils/auth';
import { useHistory } from 'react-router-dom';
import { ErrorBanner, Button } from 'src/atoms';
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
        image
        status_id
        community_id
        date
        status {
          status
          code_class
        }
      }
    }
  }
`;

const COMMUNITY_OWNER_ID = gql`
  query CommunityOwnerId($communityId: Int!) {
    communityOwnerId(communityId: $communityId)
  }
`;

const COMMUNITY_MEMBERS_IDS = gql`
  query CommunityMembersIds($communityId: Int!) {
    communityMembersIds(communityId: $communityId)
  }
`;

export const CommunityDetail = ({ match }) => {

  const { user } = useAuth();
  var userId = user?.user_id;

  if (userId === null)
    userId = 0

  const communityId = parseInt(match.params.communityId);

  const communityState = useQuery(COMMUNITY_DETAIL_QUERY, {
    variables: { communityId },
  });

  const communityOwnerId = useQuery(COMMUNITY_OWNER_ID, {
    variables: { communityId },
  });

  const communityMembersIds = useQuery(COMMUNITY_MEMBERS_IDS, {
    variables: { communityId },
  });

  const isUserAMember = !!communityMembersIds.data?.communityMembersIds.includes(userId);
  const [isMember, setIsMember] = useState(isUserAMember);
  const isUserAnOwner = (userId === communityOwnerId.data?.communityOwnerId);
  const [isOwner, setIsOwner] = useState(isUserAnOwner);

  console.log("Is member:", isMember, "Is owner:", isOwner)

  const community = communityState.data?.community;
  const history = useHistory();

  return (
    <div style={{ textAlign: 'center' }}>
      {communityState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!communityState.loading && (
        <div>
          {communityState.error && (
            <ErrorBanner title={communityState.error.message}>
              <Button color="red" onClick={() => history.go(0)}>
                Reload
              </Button>
            </ErrorBanner>
          )}
          {community && (
            <CommunityDetailTemplate
            community={community}
            isMember={isMember}
            setIsMember={setIsMember}
            isOwner={isOwner}
            setIsOwner={setIsOwner}
            communityId={communityId}
            userId={userId}
            communityOwnerId={communityOwnerId}/>
          )}
        </div>
      )}
    </div>
  );
};
