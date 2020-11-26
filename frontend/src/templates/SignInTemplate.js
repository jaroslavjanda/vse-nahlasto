import React from 'react';

import { Heading, Link } from 'src/atoms/';
import { SignInForm } from 'src/organisms/';
import { route } from 'src/Routes';

export function SignInTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <Heading>Sign In</Heading>
      <SignInForm
        isLoading={isLoading}
        errorMessage={error && error.message}
        onSubmit={onSubmit}
        className="mt3"
      >
        <div className="lh-copy">
          or{' '}
          <Link className="f5 dark-green" to={route.signUp()}>
            Sign Up
          </Link>
        </div>
        <div className="lh-copy">
          <Link className="f5 dark-green" to={route.forgottenPassword()}>
            Forgotten password?
          </Link>
        </div>
      </SignInForm>
    </>
  );
}
