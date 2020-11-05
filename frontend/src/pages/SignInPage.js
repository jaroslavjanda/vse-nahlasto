import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import { SignInTemplate } from 'src/templates/SignInTemplate';
import { useAuth } from 'src/utils/auth';

const SIGNIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        email
      }
      token
    }
  }
`;

export function SignInPage() {
  const auth = useAuth();
  const history = useHistory();


  const [signinRequest, signinRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signin: { user, token } }) => {
      auth.signin({ token, user });
      history.replace('/');
    },
    onError: () => {
      console.log("TEST Error while fetching the DB")

    },
  });

  const handleSignInFormSubmit = useCallback(
    (variables) => {
      signinRequest({ variables });
    },
    [signinRequest],
  );

  return (
    <SignInTemplate
      isLoading={signinRequestState.loading}
      error={signinRequestState.error}
      onSubmit={handleSignInFormSubmit}
    />
  );
}
