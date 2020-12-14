import React from 'react';

import { Heading } from 'src/atoms';
import { AddCommunityForm } from '../organisms/AddCommunityForm';

export function AddCommunityTemplate({ isDone, error, onSubmit, user }) {
  // TODO we should unite this error handling (also present in [SignInTemplate.js])
  if (error) {
    switch (error.message) {
      default:
    }
  }

  return (
    <>
      <div className="mw6 center">
        <Heading>Přidat komunitu</Heading>
        <AddCommunityForm
          errorMessage={error && error.message}
          successMessage={isDone}
          onSubmit={onSubmit}
          className="mt3"
          user={user}
        />
      </div>
    </>
  );
}
