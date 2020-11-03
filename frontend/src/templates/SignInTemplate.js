import React from 'react';

import { Heading, Link, MainSection } from 'src/atoms/';
import { SignInForm, TopNavigation } from 'src/organisms/';
import { route } from 'src/Routes';

export function SignInTemplate({ isLoading, error, onSubmit }) {

  if (error) {
    switch (error.message) {
      case 'Cannot read property \'password\' of undefined':
      case 'Cannot return null for non-nullable field Mutation.signin.':
        error.message = 'Wrong username or password';
        break;
    }
  }

  return (
    <>
      <TopNavigation/>
      <MainSection>
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
        </SignInForm>
      </MainSection>
    </>
  );
}
