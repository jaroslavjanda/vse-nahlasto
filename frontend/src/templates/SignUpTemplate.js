import React from 'react';

import { Heading, Link } from 'src/atoms/';
import { SignUpForm } from 'src/organisms/';
import { route } from 'src/Routes';

export function SignUpTemplate({ isLoading, error, onSubmit }) {
  return (
    <div className="mw6 center">
      <Heading>Registrace</Heading>

      <SignUpForm
        isLoading={isLoading}
        errorMessage={error && error.message}
        onSubmit={onSubmit}
        className="mt3"
      >
        <div className="lh-copy">
          nebo máte již účet?{' '}
          <Link className="f5 dark-green" to={route.signIn()}>
            Přihlašte se.
          </Link>
        </div>
      </SignUpForm>
    </div>
  );
}
