import React, { useCallback, useMemo } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ErrorBanner, Button } from 'src/atoms';
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

const JOIN_COMMUNITY_MUTATION = gql`
  mutation JoinCommunity($userId: Int!, $communityId: Int!) {
    joinPublicCommunity(userId: $userId, communityId: $communityId) {
      community_id
    }
  }
`;

export const CommunityDetail = ({ match }) => {

  const [joinPublicCommunityRequest] = useMutation(
    JOIN_COMMUNITY_MUTATION,
    {
      onCompleted: ({ joinPublicCommunity: {community_id} }) => {
        console.log("completed, comm id, user_id", community_id);
        toast.success('Nyní jste součástí komunity!');
        window.location.reload();
      },
      onError: () => {
        console.log("error, comm id, user_id");
      },
    }
  );

  const handleJoinCommunity = useCallback(
    (oldVariables) => {
      console.log("variables userId", oldVariables.variables)

      const variables = {
        userId: oldVariables.variables.userId,
        communityId: oldVariables.variables.communityId
      }

      console.log("new variables", variables)

      joinPublicCommunityRequest({ variables });
    },
    [joinPublicCommunityRequest],
  );

  const localStorage = getDataFromLocalStorage();
  var userId = localStorage?.user?.user_id;

  if (userId === null) userId = 0;

  const communityId = parseInt(match.params.communityId);

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

  console.log('Is member:', isMember, 'Is owner:', isOwner);

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
