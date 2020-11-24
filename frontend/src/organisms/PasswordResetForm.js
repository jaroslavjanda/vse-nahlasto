import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { ErrorBanner, SuccessBanner, Button } from 'src/atoms/';
import { FormikField } from 'src/molecules/FormikField';
import { Spinner } from 'react-bootstrap';

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required()
    .label('Password')
    .test(
      'len',
      'Must be at least 6 characters long',
      (val) => val.length >= 6,
    ),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .label('Password Confirmation'),
});

export function PasswordResetForm({
  errorMessage,
  successMessage,
  onSubmit,
  className,
  email,
}) {
  const initialValues = {
    email: email,
    newPassword: '',
    passwordConfirmation: '',
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
    >
      <Form className={className}>
        {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}
        {successMessage && (
          <SuccessBanner
            title={
              'Password has been changed successfully. You will be redirected in 2 seconds.'
            }
            className="mb3"
          >
            <Spinner animation="border" role="status">
              <span className="sr-only">Redirecting...</span>
            </Spinner>
          </SuccessBanner>
        )}
        <FormikField
          id="newPassword"
          name="newPassword"
          label="Password"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <Button type="submit" className="mt2 mb3">
          Confirm request
        </Button>
      </Form>
    </Formik>
  );
}
