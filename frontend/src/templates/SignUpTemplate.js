import React from 'react';
import { Container } from 'react-bootstrap';
import { Heading, Link } from 'src/atoms/';
import { SignUpForm } from 'src/organisms/';
import { route } from 'src/Routes';

export function SignUpTemplate({ isLoading, error, onSubmit }) {
  return (
    <Container>
      <Heading>Registrace</Heading>

      <SignUpForm
        isLoading={isLoading}
        errorMessage={error && error.message}
        onSubmit={onSubmit}
        className="mt3"
      >
        <div className="lh-copy">
          Máte již účet?{' '}
          <Link className="f5" to={route.signIn()}>
            Přihlašte se.
          </Link>
        </div>
      </SignUpForm>
    </Container>
  );
}
