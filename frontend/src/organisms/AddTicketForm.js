import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Col, Row } from 'react-bootstrap';
import { Button, ErrorBanner, SuccessBanner } from 'src/atoms/';
import { FormikField } from 'src/molecules/FormikField';
import { FormikTextArea } from '../molecules/FormikTextArea';
import { FormikFile } from '../molecules/FormikFile';
import { getDataFromLocalStorage } from '../utils/localStorage';

export function AddTicketForm({
  errorMessage,
  successMessage,
  onSubmit,
  className,
}) {
  const { user } = getDataFromLocalStorage();

  const initialValues = {
    title: '',
    content: '',
    file: '',
    email: '',
    showEmail: !user,
  };
  //TODO překlad - "is a required field", jak přeložit
  const schema = yup.object().shape({
    content: yup.string().required().label('Popis'),
    title: yup.string().required().label('Název'),
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
              label="Název"
              type="text"
              placeholder="Co se stalo?"
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
                placeholder="Email"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            )}
            <FormikTextArea
              id="content"
              name="content"
              label="Popis"
              type="textArea"
              rows={3}
              placeholder="Zde popiš svůj problém"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <FormikFile id="file" name="file" label="Soubor" />

            <Button type="submit" className="mt2 mb3">
              Přidat příspěvek
            </Button>
          </Form>
        </Col>
      </Row>
    </Formik>
  );
}
