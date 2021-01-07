import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button, ErrorBanner, SuccessBanner } from 'src/atoms';
import { FormikField } from 'src/molecules/FormikField';
import { FormikTextArea } from '../molecules/FormikTextArea';
import { FormikFile } from '../molecules/FormikFile';
import FormGroup from 'react-bootstrap/FormGroup';

const schema = yup.object().shape({
  description: yup.string().required('Popis je povinný.').label('Popis'),
  name: yup.string().required('Název je povinný.').label('Název'),
});

export function AddCommunityForm({
  errorMessage,
  successMessage,
  onSubmit,
  className,
  user,
}) {
  const initialValues = {
    name: '',
    description: '',
    file: null,
    closed: true,
    owner_id: user.user_id,
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
          <SuccessBanner title={'Komunita byla vytvořena.'} className="mb3" />
        )}
        <FormikField
          id="name"
          name="name"
          label="Název"
          type="text"
          placeholder="Název Vaší komunity"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikTextArea
          id="description"
          name="description"
          label="Popis"
          type="textArea"
          rows={5}
          placeholder="Popište Vaši komunitu"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikFile id="file" name="file" label="Obrázek" />
        <FormGroup style={{ textAlign: 'left' }}>
          <Field
            type="checkbox"
            id="closed"
            name="closed"
            className="pl-5 mr-2"
          />
          <label htmlFor="closed" className="form-check-label">
            Soukromá komunita
          </label>
        </FormGroup>
        <Button type="submit" className="mt2 mb3">
          Přidat komunitu
        </Button>
      </Form>
    </Formik>
  );
}
