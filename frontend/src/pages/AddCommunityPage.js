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

const UPLOAD_MUTATION = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
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
          "Community was added to the DB, its ID is " + community_id,
        );
      },
      onError: () => {
        console.log('Error while adding the community to DB');
      },
    },
  );
  const [addFileRequest] = useMutation(UPLOAD_MUTATION);

  const handleAddCommunityFormSubmit = useCallback(
    (variables) => {

      addFileRequest({ variables: { file: variables.file } });
      addCommunityRequest({
        variables: variables,
      });
    },
    [addCommunityRequest, addFileRequest],
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
