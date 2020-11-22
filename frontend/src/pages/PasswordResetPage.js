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

  const user_email = match.params.email.toString();
  const code = parseInt(match.params.code);

  console.log(user_email, code);

  const previousRequest = useQuery(VALID_REQUEST_CHECK_QUERY, {
    variables: { user_email, code },
  });

  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(
    PASSWORD_RESET_MUTATION,
    {
      onCompleted: ({ resetUserPassword: { email } }) => {
        console.log('XXX password of user ' + email + ' was changed.');
      },
      onError: () => {
        console.log('XXX error');
      },
    },
  );

  const handleResetPasswordFormSubmit = useCallback(
    (variables) => {
      resetPasswordRequest({ variables });
    },
    [resetPasswordRequest],
  );

  if (previousRequest.data?.changePasswordRequest) {
    return (
      <PasswordResetTemplate
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
