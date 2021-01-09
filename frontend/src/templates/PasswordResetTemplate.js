import React from 'react';
import { Container } from 'react-bootstrap';
import { Heading } from 'src/atoms';
import { PasswordResetForm } from '../organisms/PasswordResetForm';

export function PasswordResetTemplate({ isDone, error, onSubmit, email }) {
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
    <Container className="mw6 center">
      <Heading>Reset password</Heading>
      <PasswordResetForm
        email={email}
        errorMessage={error && error.message}
        successMessage={isDone}
        onSubmit={onSubmit}
        className="mt3"
      />
    </Container>
  );
}
