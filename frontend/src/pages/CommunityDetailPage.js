import React, { useCallback, useMemo } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Button, ErrorBanner } from 'src/atoms';
import { CommunityDetailTemplate } from '../templates/CommunityDetailTemplate';
import { getDataFromLocalStorage } from '../utils/localStorage';
import { toast } from 'react-toastify';

const COMMUNITY_DETAIL_QUERY = gql`
  query CommunityList($communityId: Int!) {
    communityMembersIds(communityId: $communityId)
    communityOwnerId(communityId: $communityId)
    community(communityId: $communityId) {
      name
      description
      closed
      owner {
        user_id
      }
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
        comments {
          comment_id
          content
        }
        status {
          status
          status_id
          code_class
        }
      }
    }
  }
`;


const JOIN_COMMUNITY_MUTATION = gql`
  mutation JoinCommunity($userId: Int!, $communityId: Int!) {
    joinPublicCommunity(userId: $userId, communityId: $communityId) {
      community_id
    }
  }
`;

export const CommunityDetail = ({ match }) => {
  console.log("match", match)
  const [joinPublicCommunityRequest] = useMutation(
    JOIN_COMMUNITY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Nyní jste součástí komunity!');
        window.location.reload();
      },
      onError: () => {
      },
    },
  );

  const handleJoinCommunity = useCallback(
    (oldVariables) => {
      const variables = {
        userId: oldVariables.variables.userId,
        communityId: oldVariables.variables.communityId,
      };
      joinPublicCommunityRequest({ variables });
    },
    [joinPublicCommunityRequest],
  );

  const localStorage = getDataFromLocalStorage();
  var userId = localStorage?.user?.user_id;

  if (userId === undefined) userId = 0;
  console.log("match")
  const communityId = parseInt(match.params.communityId);
  console.log(match)
  const communityState = useQuery(COMMUNITY_DETAIL_QUERY, {
    variables: { communityId },
  });

  const { isMember, isOwner } = useMemo(() => {
    const isMember = !!communityState.data?.communityMembersIds.includes(
      userId,
    );
    const isOwner = userId === communityState.data?.communityOwnerId;
    return { isMember, isOwner };
  }, [communityState, userId]);

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
                Načíst znovu
              </Button>
            </ErrorBanner>
          )}
          {community && (
            <CommunityDetailTemplate
              community={community}
              isMember={isMember}
              isOwner={isOwner}
              handleJoinCommunity={handleJoinCommunity}
              communityId={communityId}
              userId={userId}
              communityOwnerId={communityState}
            />
          )}
        </div>
      )}
    </div>
  );
};
