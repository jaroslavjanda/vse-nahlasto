import React, { useCallback } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { EditCommunityTemplate } from '../templates/EditCommunityTemplate';

const COMMUNITY_QUERY = gql`
  query Community($community_id: Int!) {
    community(communityId: $community_id) {
      description
    }
  }
`;

const EDIT_COMMUNITY_MUTATION = gql`
  mutation EditCommunity($description: String!, $community_id: Int!) {
    editCommunity(description: $description, community_id: $community_id) {
      community_id
    }
  }
`;

export const EditCommunityPage = ({ match }) => {
  const community_id = parseInt(match.params.communityId);

  const currentDescription = useQuery(COMMUNITY_QUERY, {
    variables: { community_id },
  }).data?.community?.description;

  const [editCommunityRequest, editCommunityRequestState] = useMutation(
    EDIT_COMMUNITY_MUTATION,
    {
      onCompleted: () => setTimeout(() => {
        window.location.replace(
          'http://frontend.team07.vse.handson.pro/community-detail/' + community_id,
        );
      }, 2000),
      onError: () => {
      },
    },
  );

  const handleEditCommunityFormSubmit = useCallback(
    (variables) => {
      editCommunityRequest({
        variables: variables,
      });
    },
    [editCommunityRequest],
  );

  return (
    <EditCommunityTemplate
      isDone={editCommunityRequestState.data}
      error={editCommunityRequestState.error}
      onSubmit={handleEditCommunityFormSubmit}
      currentDescription={currentDescription}
      community_id={community_id}
    />
  );
};
