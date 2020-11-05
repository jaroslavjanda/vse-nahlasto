import React from 'react';

import { Heading, MainSection } from 'src/atoms';
import { TopNavigation } from 'src/organisms/TopNavigation';
import { PasswordResetForm } from '../organisms/PasswordResetForm';

export function PasswordResetTemplate({ isDone, error, onSubmit }) {
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
    <>
      <TopNavigation />
      <MainSection>
        <Heading>Reset password</Heading>

        <PasswordResetForm
          errorMessage={error && error.message}
          successMessage={isDone}
          onSubmit={onSubmit}
          className="mt3"
        ></PasswordResetForm>
      </MainSection>
    </>
  );
}
