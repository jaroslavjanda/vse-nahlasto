import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AddCommunityTemplate } from '../templates/AddCommunityTemplate';
import { getDataFromLocalStorage } from '../utils/localStorage';
import { useHistory } from 'react-router-dom';
import { ErrorBanner } from '../atoms';
import { route } from 'src/Routes';

const ADD_COMMUNITY_MUTATION = gql`
  mutation AddCommunity(
    $name: String!
    $description: String
    $image: Upload
    $closed: Boolean!
    $owner_id: Int!
  ) {
    addCommunity(
      name: $name
      description: $description
      image: $image
      closed: $closed
      ownerId: $owner_id
    ) {
      community_id
    }
  }
`;

export const AddCommunityPage = () => {
  let user = getDataFromLocalStorage()?.user;
  const history = useHistory();

  const [addCommunityRequest, addCommunityRequestState] = useMutation(
    ADD_COMMUNITY_MUTATION,
    {
      onCompleted: ({ addCommunity: { community_id } }) => {
        console.log('Community was added to the DB, its ID is ' + community_id);
        history.replace(route.adminAllCommunities());
      },
      onError: () => {
        console.log('Error while adding the community to DB');
      },
    },
  );

  const handleAddCommunityFormSubmit = useCallback(
    (oldVariables) => {
      const variables = {
        name: oldVariables.name,
        description: oldVariables.description,
        image: oldVariables.file? oldVariables.file: null,
        owner_id: oldVariables.owner_id,
        closed: oldVariables.closed,
      };
      addCommunityRequest({ variables });
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
      <ErrorBanner title="Uživatel není přihlášen">
        Musíš se přihlásit.
      </ErrorBanner>
    );
  }
};
