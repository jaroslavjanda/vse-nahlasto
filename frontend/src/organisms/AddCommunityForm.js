import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button, ErrorBanner, SuccessBanner } from 'src/atoms';
import { FormikField } from 'src/molecules/FormikField';
import { FormikTextArea } from '../molecules/FormikTextArea';
import { FormikFile } from '../molecules/FormikFile';
import FormGroup from 'react-bootstrap/FormGroup';

const schema = yup.object().shape({
  description: yup.string().required().label('Content'),
  name: yup.string().required().label('Title'),
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
          <SuccessBanner title={'Community has been created'} className="mb3" />
        )}
        <FormikField
          id="name"
          name="name"
          label="Name"
          type="text"
          placeholder="Name of your community"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
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
        <FormikFile id="file" name="file" label="File" />
        <FormGroup style={{ textAlign: 'left' }}>
          <Field
            type="checkbox"
            id="closed"
            name="closed"
            className={'form-check-input'}
            className="pl-5 mr-2"
          />
          <label htmlFor="closed" className="form-check-label">
            Make this community private
          </label>
        </FormGroup>
        <div>
          <Button type="submit" className="mt2 mb3">
            Confirm request
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
