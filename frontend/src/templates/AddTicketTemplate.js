import React from 'react';

import { Heading } from 'src/atoms';
import { AddTicketForm } from '../organisms/AddTicketForm';

export function AddTicketTemplate({
  isDone,
  error,
  onSubmit,
  handleFileUpload,
}) {
  // TODO we should unite this error handling (also present in [SignInTemplate.js])
  if (error) {
    switch (error.message) {
      case 'Cannot return null for non-nullable field Mutation.resetUserPassword.':
        error.message = 'User not found. Have you signed up yet?';
        break;
      default:
    }
  }

  return (
    <div className="mw6 center">
      <Heading>Přidat příspěvek</Heading>
      <AddTicketForm
        errorMessage={error && error.message}
        successMessage={isDone}
        onSubmit={onSubmit}
        className="mt3"
      />
    </div>
  );
}
