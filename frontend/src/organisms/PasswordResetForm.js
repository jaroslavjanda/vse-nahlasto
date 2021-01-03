import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button, ErrorBanner, SuccessBanner } from 'src/atoms/';
import { FormikField } from 'src/molecules/FormikField';
import { Spinner } from 'react-bootstrap';

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required()
    .label('Password')
    .test(
      'len',
      'Heslo musí mít alespoň 6 znaků.',
      (val) => val.length >= 6,
    ),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword'), null], 'Hesla se musí shodovat.')
    .label('Potvrzení hesla'),
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
              'Heslo bylo úspěšně změněno. Za 2 sekundy budete přesměrováni.'
            }
            className="mb3"
          >
            <Spinner animation="border" role="status">
              <span className="sr-only">Přesměrovávání...</span>
            </Spinner>
          </SuccessBanner>
        )}
        <FormikField
          id="newPassword"
          name="newPassword"
          label="Heslo"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Potvrzení hesla"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <Button type="submit" className="mt2 mb3">
          Potvrdit žádost
        </Button>
      </Form>
    </Formik>
  );
}
