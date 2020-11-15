import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner, SuccessBanner, Button } from 'src/atoms/';
import { FormikField } from 'src/molecules/FormikField';
import { FormikTextArea } from '../molecules/FormikTextArea';
import { FormikFile } from '../molecules/FormikFile';

const initialValues = {
  title: '',
  content: '',
};

const schema = yup.object().shape({
  content: yup.string().required().label('Content'),
  title: yup.string().required().label('Title'),
  file: yup.mixed().required().label('File').test('file', 'cannot be undefined', (value) => {
    console.log(value); return value;
  })
});

export function AddTicketForm({
  errorMessage,
  successMessage,
  onSubmit,
  className,
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
        {successMessage && (
          <SuccessBanner title={'Ticket has been sent'} className="mb3" />
        )}
        <FormikField
          id="title"
          name="title"
          label="Title"
          type="text"
          placeholder="What's wrong?"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikTextArea
          id="content"
          name="content"
          label="Content"
          type="textArea"
          rows={3}
          placeholder="Describe your problem further"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikFile
          id="file"
          name="file"
          label="File"
        />
        <Button type="submit" className="mt2 mb3">
          Confirm request
        </Button>
      </Form>
    </Formik>
  );
}
