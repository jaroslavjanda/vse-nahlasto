import React from 'react';

import { Heading } from 'src/atoms';
import { PasswordResetForm } from '../organisms/PasswordResetForm';

export function PasswordResetTemplate({ isDone, error, onSubmit }) {
  // TODO we should unite this error handling (also present in [SignInTemplate.js])
  if (error) {
    switch (error.message) {
      case 'Cannot return null for non-nullable field Mutation.resetUserPassword.':
        error.message =
          'No user registered with this email. Have you signed up yet?';
        break;
      default:
    }
  }

  return (
    <>
      <Heading>Reset password</Heading>
      <PasswordResetForm
        errorMessage={error && error.message}
        successMessage={isDone}
        onSubmit={onSubmit}
        className="mt3"
      />
    </>
  );
}
