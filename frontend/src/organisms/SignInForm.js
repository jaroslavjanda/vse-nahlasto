import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner } from 'src/atoms/';
import { FormikField } from 'src/molecules/';
import { Button } from 'react-bootstrap';

const initialValues = {
  email: '',
  password: '',
};

const schema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
});

export function SignInForm({
  isLoading,
  errorMessage,
  className,
  onSubmit,
  children,
}) {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
    >
      <Form className={className}>
        {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}
        <FormikField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="např. jan@novak.cz"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="password"
          name="password"
          label="Heslo"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />

        <div style={{ textAlign: 'right' }}>
          <Button
            className="homepageButton"
            type="submit"
            variant="success"
            size="lg"
            style={{ marginBottom: '10px' }}
          >
            Přihlásit se
          </Button>
          {children}
        </div>
      </Form>
    </Formik>
  );
}
