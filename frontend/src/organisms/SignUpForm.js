import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner } from 'src/atoms/';
import { FormikField } from 'src/molecules';
import { Button } from 'react-bootstrap';
import FormGroup from 'react-bootstrap/FormGroup';
import { route } from 'src/Routes';

const initialValues = {
  name: '',
  surname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  checkboxAcceptTerms: false,
};

const schema = yup.object().shape({
  name: yup.string().required('Jméno je povinné.').label('Jméno'),
  surname: yup.string().required('Příjmení je povinné.').label('Příjmení'),
  email: yup.string().email('Tohle není validní emailová adresa').required('Email je povinný.').label('Email'),
  password: yup
    .string()
    .required('Heslo je povinné.')
    .label('Heslo')
    .test('len', 'Heslo musí mít alespoň 6 znaků.', (val) => val.length >= 6),
  passwordConfirmation: yup
    .string()
    .required('Zopakujte heslo.')
    .oneOf([yup.ref('password'), null], 'Hesla se musí shodovat.')
    .label('Potvrzení hesla'),
  checkboxAcceptTerms: yup.bool().oneOf([true], 'Musíte přijmout podmínky.'),
});

export function SignUpForm({ errorMessage, className, onSubmit, children }) {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form className={className}>
        {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}
        <FormikField
          id="name"
          name="name"
          label="Jméno"
          type="text"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="surname"
          name="surname"
          label="Příjmení"
          type="text"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
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
        <FormikField
          id="password"
          name="password"
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
        <FormGroup style={{ textAlign: 'right' }}>
          <Field
            type="checkbox"
            id="checkboxAcceptTerms"
            name="checkboxAcceptTerms"
            className={'form-check-input'}
          />
          <label htmlFor="checkboxAcceptTerms" className="form-check-label">
            Souhlasím s <a href={route.termsOfService()}>podmínkami </a>a se
            zpracováním osobních údajů
          </label>
          <ErrorMessage
            name="checkboxAcceptTerms"
            component="div"
            className="mb1 f6 dark-red f5"
          />
        </FormGroup>
        <div style={{ textAlign: 'right' }}>
          <Button
            className="homepageButton"
            type="submit"
            variant="success"
            size="lg"
            style={{ margin:0, marginBottom: '10px' }}
          >
            Registrovat se
          </Button>
          {children}
        </div>
      </Form>
    </Formik>
  );
}
