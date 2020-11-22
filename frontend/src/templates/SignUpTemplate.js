import React from 'react';

import { Heading, Link } from 'src/atoms/';
import { SignUpForm } from 'src/organisms/';
import { route } from 'src/Routes';

export function SignUpTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <Heading>Sign Up</Heading>

      <SignUpForm
        isLoading={isLoading}
        errorMessage={error && error.message}
        onSubmit={onSubmit}
        className="mt3"
      >
        <div className="lh-copy">
          or{' '}
          <Link className="f5 dark-green" to={route.signIn()}>
            Sign In
          </Link>
        </div>
      </SignUpForm>
    </>
  );
}
