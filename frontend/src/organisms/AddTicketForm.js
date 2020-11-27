import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { Row, Col } from 'react-bootstrap';
import { ErrorBanner, SuccessBanner, Button } from 'src/atoms/';
import { FormikField } from 'src/molecules/FormikField';
import { FormikTextArea } from '../molecules/FormikTextArea';
import { FormikFile } from '../molecules/FormikFile';
import { useAuth } from 'src/utils/auth';

export function AddTicketForm({
  errorMessage,
  successMessage,
  onSubmit,
  className,
}) {
  const { user } = useAuth();

  const initialValues = {
    title: '',
    content: '',
    file: '',
    email: '',
    showEmail: user ? false : true,
  };

  const schema = yup.object().shape({
    content: yup.string().required().label('Content'),
    title: yup.string().required().label('Title'),
    email: yup
      .string()
      .email()
      .when('showEmail', {
        is: true,
        then: yup.string().required('Must enter email address'),
      }),
  });

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
    >
      <Row>
        <Col>
          <Form className={className}>
            {errorMessage && (
              <ErrorBanner title={errorMessage} className="mb3" />
            )}
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
            {!user && (
              <FormikField
                id="email"
                name="email"
                label="Email"
                type="text"
                rows={3}
                placeholder="Describe your problem further"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            )}
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
        </Col>
      </Row>
    </Formik>
  );
}
