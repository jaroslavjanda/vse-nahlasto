import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button, ErrorBanner, SuccessBanner } from 'src/atoms';
import { FormikTextArea } from '../molecules/FormikTextArea';
import { Spinner } from 'react-bootstrap';

const schema = yup.object().shape({
  description: yup
    .string()
    .required()
    .label('Popis')
    .max(500, 'Popis je příliš dlouhý. Použij maximálně 500 znaků.'),
});

export function EditCommunityForm({
  errorMessage,
  successMessage,
  onSubmit,
  className,
  community_id,
  currentDescription,
}) {
  const initialValues = {
    closed: true,
    community_id: community_id,
    description: currentDescription,
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
              'Popis komunity byl upraven. Za 2 sekundy budete přesměrováni.'
            }
            className="mb3"
          >
            <Spinner animation="border" role="status">
              <span className="sr-only">Přesměrovávání...</span>
            </Spinner>
          </SuccessBanner>
        )}
        <FormikTextArea
          id="description"
          name="description"
          label="Popis"
          type="textArea"
          rows={5}
          placeholder="Popište svoji komunitu"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <Button type="submit" className="mt2 mb3">
          Uložit změny
        </Button>
      </Form>
    </Formik>
  );
}
