import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AddCommunityTemplate } from '../templates/AddCommunityTemplate';

const ADD_COMMUNITY_MUTATION = gql`
  mutation AddCommunity(
    $name: String!
    $description: String
    $code: String
    $closed: Boolean!
    $owner_id: Int!
  ) {
    addCommunity(
      name: $name,
      description: $description,
      code: $code,
      closed: $closed,
#      TODO get owner ID - authuser.id
      ownerId: $owner_id
    ) {
      community_id
    }
  }
`;

export const AddCommunityPage = () => {
  const [addCommunityRequest, addCommunityRequestState] = useMutation(
    ADD_COMMUNITY_MUTATION,
    {
      onCompleted: ({ addCommunity: { community_id } }) => {
        console.log('Community was added to the DB, it\'s ID is ' + community_id);
      },
      onError: () => {
        console.log('Error while adding the community to DB');
      },
    },
  );

  const handleAddCommunityFormSubmit = useCallback(
    (variables) => {
      addCommunityRequest({ variables });
    },
    [addCommunityRequest]
  )

  return (
    <AddCommunityTemplate
      isDone={addCommunityRequestState.data}
      error={addCommunityRequestState.error}
      onSubmit={handleAddCommunityFormSubmit}
      />
  )
};
