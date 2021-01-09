import React from 'react';

import { Container } from 'react-bootstrap';
import { Heading, Link } from 'src/atoms/';
import { SignInForm } from 'src/organisms/';
import { route } from 'src/Routes';

export function SignInTemplate({ isLoading, error, onSubmit }) {
  return (
    <Container className="mw6 center">
      <Heading>Přihlášení</Heading>
      <SignInForm
        isLoading={isLoading}
        errorMessage={error && error.message}
        onSubmit={onSubmit}
        className="mt3"
      >
        <div className="lh-copy">
          Nemáte účet?{' '}
          <Link className="f5" to={route.signUp()}>
            Registrujte se.
          </Link>
        </div>
        <div className="lh-copy">
          <Link className="f5" to={route.forgottenPassword()}>
            Zapomenuté heslo?
          </Link>
        </div>
      </SignInForm>
    </Container>
  );
}
