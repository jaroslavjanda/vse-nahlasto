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
  mutation EditCommunity(
    $description: String!,
    $community_id: Int!
  ) {
    editCommunity(
      description: $description,
      community_id: $community_id
    ) {
      community_id
    }
  }
`;

export const EditCommunityPage = ({ match }) => {

  const community_id = parseInt(match.params.communityId);

  const currentDescription = useQuery(COMMUNITY_QUERY, {
    variables: { community_id }
  }).data?.community?.description;

  console.log("Community ID, currenDesc: ", community_id, currentDescription)

  const [editCommunityRequest, editCommunityRequestState] = useMutation(
    EDIT_COMMUNITY_MUTATION,
    {
      onCompleted: () => {
        console.log('Community was edited in the DB');
      },
      onError: () => {
        console.log('Error while editing the community');
      },
    },
  );

  const handleEditCommunityFormSubmit = useCallback(
    (variables) => {
      console.log('Community is ' + variables.community_id);
      console.log('Variables are ', variables)
      editCommunityRequest({
        variables: variables
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
