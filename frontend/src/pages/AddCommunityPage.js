import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AddCommunityTemplate } from '../templates/AddCommunityTemplate';
import { useAuth } from '../utils/auth';
import { useHistory } from 'react-router-dom';
import { ErrorBanner } from '../atoms';

const ADD_COMMUNITY_MUTATION = gql`
  mutation AddCommunity(
    $name: String!
    $description: String
    $image: String
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

const UPLOAD_MUTATION = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;
export const AddCommunityPage = () => {
  const { user } = useAuth();
  const history = useHistory();

  const [addCommunityRequest, addCommunityRequestState] = useMutation(
    ADD_COMMUNITY_MUTATION,
    {
      onCompleted: ({ addCommunity: { community_id } }) => {
        console.log('Community was added to the DB, its ID is ' + community_id);
        history.replace('/communities/');
      },
      onError: () => {
        console.log('Error while adding the community to DB');
      },
    },
  );
  const [addFileRequest] = useMutation(UPLOAD_MUTATION);

  const handleAddCommunityFormSubmit = useCallback(
    (oldVariables) => {
      var img = oldVariables.file ? oldVariables.file.name : '';

      const variables = {
        name: oldVariables.name,
        description: oldVariables.description,
        image: img,
        owner_id: oldVariables.owner_id,
        closed: oldVariables.closed,
      };
      console.log(variables);
      if (oldVariables.file) {
        addFileRequest({ variables: { file: oldVariables.file } });
      }
      addCommunityRequest({
        variables,
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
      <ErrorBanner title="Uživatel není přihlášen">
        Musíš se přihlásit.
      </ErrorBanner>
    );
  }
};
