import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner, SuccessBanner, Button } from 'src/atoms';
import { FormikTextArea } from '../molecules/FormikTextArea';

const schema = yup.object().shape({
  description: yup.string().required().label('Content').max(500, "Too long! Please use max 500 characters."),
});

export function EditCommunityForm({
                                   errorMessage,
                                   successMessage,
                                   onSubmit,
                                   className,
                                   community_id
                                 }) {
  const initialValues = {
    description: '',
    closed: true,
    community_id: community_id
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
          <SuccessBanner title={'Community description has been edited'} className="mb3" />
        )}
        <FormikTextArea
          id="description"
          name="description"
          label="Description"
          type="textArea"
          rows={5}
          placeholder="Describe your community"
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
