import React, { useCallback } from 'react';
import { PasswordResetTemplate } from '../templates/PasswordResetTemplate';
import { gql, useMutation } from '@apollo/client';

const PASSWORD_RESET_MUTATION = gql`
  mutation PasswordReset($email: String!, $newPassword: String!) {
    resetUserPassword(email: $email, newPassword: $newPassword) {
      email
    }
  }
`;

export function PasswordResetPage() {

  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(PASSWORD_RESET_MUTATION, {
    onCompleted: ({ resetUserPassword: { email } }) => {
      console.log("XXX password of user " + email + " was changed.")

    },
    onError: ( ) => {
      console.log("XXX error")
    },
  });

  const handleResetPasswordFormSubmit = useCallback(
    (variables) => {
      resetPasswordRequest({ variables });
    },
    [resetPasswordRequest],
  );

  return (
    <PasswordResetTemplate
      isDone={resetPasswordRequestState.data}
      error={resetPasswordRequestState.error}
      onSubmit={handleResetPasswordFormSubmit}
    />
  );
}
