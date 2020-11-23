import React, { useCallback } from 'react';
import { PasswordResetTemplate } from '../templates/PasswordResetTemplate';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ErrorBanner } from '../atoms';

const PASSWORD_RESET_MUTATION = gql`
  mutation PasswordReset($email: String!, $newPassword: String!) {
    resetUserPassword(email: $email, newPassword: $newPassword) {
      email
    }
  }
`;

const VALID_REQUEST_CHECK_QUERY = gql`
  query ChangePasswordRequest($user_email: String!, $code: Int!) {
    changePasswordRequest(user_email: $user_email, code: $code) {
      user_email
      code
    }
  }
`;

export function PasswordResetPage({ match }) {

  // parameters from URL link sent via email
  const user_email = match.params.email.toString();
  const code = parseInt(match.params.code);

  // finds the last sent change-password request, if not found, link is not valid
  const currentRequest = useQuery(VALID_REQUEST_CHECK_QUERY, {
    variables: { user_email, code },
  });

  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(
    PASSWORD_RESET_MUTATION, {
      onCompleted: () => setTimeout(
        () => {
          window.location.replace("http://dev.frontend.team07.vse.handson.pro/auth/signin");
        }, 2000
      )
    });

  const handleResetPasswordFormSubmit = useCallback(
    (variables) => {
      resetPasswordRequest({ variables });
    },
    [resetPasswordRequest],
  );

  if (currentRequest.data?.changePasswordRequest) {
    return (
      <PasswordResetTemplate
        email={user_email}
        isDone={resetPasswordRequestState.data}
        error={resetPasswordRequestState.error}
        onSubmit={handleResetPasswordFormSubmit}
      />
    );
  } else {
    return (
      <ErrorBanner title="Neplatný odkaz.">
        Platnost Vašeho odkazu vypršela.
      </ErrorBanner>
    );
  }
}
