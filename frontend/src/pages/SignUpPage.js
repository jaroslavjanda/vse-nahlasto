import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import { SignUpTemplate } from 'src/templates/SignUpTemplate';
import { useAuth } from 'src/utils/auth';

const SIGNUP_MUTATION = gql`
  mutation SignUp(
    $name: String!
    $surname: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, surname: $surname, email: $email, password: $password) {
      user {
        email
        user_id
        name
        surname
      }
      token
    }
  }
`;

export function SignUpPage() {
  const auth = useAuth();
  const history = useHistory();
  const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signup: { user, token } }) => {
      console.log(token,user)
      auth.signin({ token, user });
      history.replace('/');
      window.location.reload();
    },
    onError: () => {},
  });

  const handleSignUpFormSubmit = useCallback(
    (variables) => {
      signupRequest({ variables });
    },
    [signupRequest],
  );

  return (
    <SignUpTemplate
      isLoading={signupRequestState.loading}
      error={signupRequestState.error}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
