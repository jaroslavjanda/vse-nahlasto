import React from 'react';

import { Heading } from 'src/atoms';
import { EditCommunityForm } from '../organisms/EditCommunityForm';

export function EditCommunityTemplate({ isDone, error, onSubmit, community_id }) {
  // TODO we should unite this error handling (also present in [SignInTemplate.js])
  if (error) {
    switch (error.message) {
      default:
    }
  }

  return (
    <>
      <Heading>Add community</Heading>
      <EditCommunityForm
        errorMessage={error && error.message}
        successMessage={isDone}
        onSubmit={onSubmit}
        className="mt3"
        community_id={community_id}
      />
    </>
  );
}
