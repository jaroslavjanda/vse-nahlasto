import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AddCommunityTemplate } from '../templates/AddCommunityTemplate';
import { useAuth } from '../utils/auth';
import { ErrorBanner } from '../atoms';

const ADD_COMMUNITY_MUTATION = gql`
  mutation AddCommunity(
    $name: String!
    $description: String
    $closed: Boolean!
    $owner_id: Int!
  ) {
    addCommunity(
      name: $name
      description: $description
      closed: $closed
      ownerId: $owner_id
    ) {
      community_id
    }
  }
`;

export const AddCommunityPage = () => {
  const { user } = useAuth();

  const [addCommunityRequest, addCommunityRequestState] = useMutation(
    ADD_COMMUNITY_MUTATION,
    {
      onCompleted: ({ addCommunity: { community_id } }) => {
        console.log(
          "Community was added to the DB, it's ID is " + community_id,
        );
      },
      onError: () => {
        console.log('Error while adding the community to DB');
      },
    },
  );

  const handleAddCommunityFormSubmit = useCallback(
    (variables) => {
      console.log('User is ' + variables.owner_id);
      addCommunityRequest({
        variables: variables,
      });
    },
    [addCommunityRequest],
  );

  if (user != null) {
    return (
      <AddCommunityTemplate
        isDone={addCommunityRequestState.data}
        error={addCommunityRequestState.error}
        onSubmit={handleAddCommunityFormSubmit}
        user={user}
      />
    );
  } else {
    return (
      <ErrorBanner title="Uživatel není přihlášen">Musíš se přihlásit.</ErrorBanner>
    );
  }
};
