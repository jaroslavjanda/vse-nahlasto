import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { EditCommunityTemplate } from '../templates/EditCommunityTemplate';

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

  console.log("Community ID: ", community_id)

  const [editCommunityRequest, editCommunityRequestState] = useMutation(
    EDIT_COMMUNITY_MUTATION,
    {
      onCompleted: ({ addCommunity: { community_id } }) => {
        console.log('Community was edited in the DB, it\'s ID is ' + community_id);
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
      community_id={community_id}
    />
  );
};
