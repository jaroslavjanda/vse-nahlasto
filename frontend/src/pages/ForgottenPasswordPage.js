import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { Button, ErrorBanner, SuccessBanner } from 'src/atoms/';
import { FormikField } from '../molecules';
import * as yup from 'yup';
import { errorMessage } from 'jest-validate';

const PASSWORD_CHANGE_REQUEST_MUTATION = gql`
  mutation SetResetCode($email: String!) {
    setResetCode(email: $email) {
      user_email
    }
  }
`;

export function ForgottenPasswordPage() {
  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(
    PASSWORD_CHANGE_REQUEST_MUTATION,
    {
      onCompleted: () => {},
      onError: () => {},
    },
  );

  const handleChangePasswordRequest = useCallback(
    (variables) => {
      resetPasswordRequest({ variables });
    },
    [resetPasswordRequest],
  );

  const initialValues = {
    email: '',
  };

  const schema = yup.object().shape({
    email: yup.string().email('Tohle není validní emailová adresa.').required('Zadejte svůj email.').label('Email'),
  });

  return (
    <div className="mw6 center">
      <Formik
        onSubmit={handleChangePasswordRequest}
        initialValues={initialValues}
        validationSchema={schema}
        validateOnBlur={false}
      >
        <Form className={'mt3'}>
          {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}
          {resetPasswordRequestState.data && (
            <SuccessBanner title={'Email byl odeslán.'} className="mb3" />
          )}
          <FormikField
            id="email"
            name="email"
            label="Email"
            type="text"
            placeholder="např. jan@novak.cz"
            autoComplete="on"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <div style={{ textAlign: 'right' }}>
            <Button type="submit" className="mt2 mb3">
              Odeslat žádost
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
