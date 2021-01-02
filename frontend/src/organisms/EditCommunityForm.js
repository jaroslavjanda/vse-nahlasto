import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button, ErrorBanner, SuccessBanner } from 'src/atoms';
import { FormikTextArea } from '../molecules/FormikTextArea';

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
            title={'Popis komunity byl změněn.'}
            className="mb3"
          />
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
