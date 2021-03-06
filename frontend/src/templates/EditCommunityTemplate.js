import React from 'react';

import { Heading } from 'src/atoms';
import { EditCommunityForm } from '../organisms/EditCommunityForm';

export function EditCommunityTemplate({
  isDone,
  error,
  onSubmit,
  community_id,
  currentDescription,
}) {
  if (error) {
    switch (error.message) {
      default:
    }
  }

  return (
    <div className="mw6 center">
      <Heading>Upravit popis komunity</Heading>
      <EditCommunityForm
        errorMessage={error && error.message}
        successMessage={isDone}
        onSubmit={onSubmit}
        className="mt3"
        community_id={community_id}
        currentDescription={currentDescription}
      />
    </div>
  );
}
