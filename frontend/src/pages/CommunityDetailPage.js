import React, { useCallback, useMemo } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { CommunityDetailTemplate } from '../templates/CommunityDetailTemplate'
import { getDataFromLocalStorage } from '../utils/localStorage'
import { toast } from 'react-toastify'
import { ErrorType } from '../utils/Error'
import { ErrorBannerWithRefreshButton } from '../atoms/ErrorBannerWithRefreshButton'
import { Loading } from '../atoms'

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
        likes{
          ticket_id
          likes_count
          likes_users{
            user_id
          }
        }
      }
    }
  }
`

const JOIN_COMMUNITY_MUTATION = gql`
  mutation JoinCommunity($userId: Int!, $communityId: Int!) {
    joinPublicCommunity(userId: $userId, communityId: $communityId) {
      community_id
    }
  }
`

const JOIN_PRIVATE_COMMUNITY_MUTATION = gql`
  mutation  JoinPrivateCommunityRequest($userId: Int!, $communityId: Int!) {
    joinPrivateCommunityRequest(userId: $userId, communityId: $communityId) {
      communityId
    }
  }
`;

export const CommunityDetail = ({ match }) => {
  const [joinPublicCommunityRequest] = useMutation(JOIN_COMMUNITY_MUTATION, {
    onCompleted: () => {
      toast.success('Nyní jste součástí komunity!')
      window.location.reload()
    },
    onError: () => {
    },
  });

  const [joinPrivateCommunityRequest] = useMutation(JOIN_PRIVATE_COMMUNITY_MUTATION, {
    onCompleted: () => {
      toast.info('Požadavek byl odeslán.')
    },
    onError: () => {
      console.log("Error while performing request: ")
    },
  });

  const handleJoinCommunity = useCallback(
    (oldVariables) => {
      const variables = {
        userId: oldVariables.variables.userId,
        communityId: oldVariables.variables.communityId,
      }
      joinPublicCommunityRequest({ variables })
    },
    [joinPublicCommunityRequest],
  )

  const handlePrivateCommunityJoinRequest = useCallback(
    (oldVariables) => {
      const variables = {
        userId: oldVariables.variables.userId,
        communityId: oldVariables.variables.communityId,
      };
      joinPrivateCommunityRequest({ variables });
    },
    [joinPublicCommunityRequest],
  );

  let user = getDataFromLocalStorage()?.user;
  var userId = user ? parseInt(user.user_id) : undefined;
  if (userId === undefined) userId = 0;

  const communityId = parseInt(match.params.communityId)
  const state = useQuery(COMMUNITY_DETAIL_QUERY, {
    variables: { communityId },
  })

  const { isMember, isOwner } = useMemo(() => {
    const isMember = !!state.data?.communityMembersIds.includes(userId)
    const isOwner = userId === state.data?.communityOwnerId
    return { isMember, isOwner }
  }, [state, userId])

  const community = state.data?.community

  return (
    <div style={{ textAlign: 'center' }}>
      {state.loading && <Loading />}
      {!state.loading && (
        <div>
          {state.error && (
            <ErrorBannerWithRefreshButton
              errorType={ErrorType.LOAD_DATA_FAILED}
            />
          )}
          {community && (
            <CommunityDetailTemplate
              community={community}
              isMember={isMember}
              isOwner={isOwner}
              handleJoinCommunity={handleJoinCommunity}
              handlePrivateCommunityJoinRequest={handlePrivateCommunityJoinRequest}
              communityId={communityId}
              userId={userId}
              communityOwnerId={state}
            />
          )}
        </div>
      )}
    </div>
  )
}
