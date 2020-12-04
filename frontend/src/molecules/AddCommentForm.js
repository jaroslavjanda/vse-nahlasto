import { Form } from 'react-bootstrap';
import { Button, ErrorBanner, SuccessBanner } from '../atoms';
import { toast } from 'react-toastify';
import React, { useCallback } from 'react';
import { useAuth } from '../utils/auth';

import { Formik, FormikConsumer } from 'formik';
import { FormikField } from './FormikField';
import { text } from '@fortawesome/fontawesome-svg-core';
import { FormikTextArea } from './FormikTextArea';
import * as yup from 'yup';

export function AddCommentForm({
  isLoading,
  errorMessage,
  className,
  initialValues,
  onSubmit,
  children,
}) {
  // if (user_id != null) {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validateOnBlur={false}
    >
      <Form>
        {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}

        <FormikTextArea
          id="content"
          name="content"
          type="textArea"
          rows={3}
          placeholder="Vlož komentář"
          autoFocus="autofocus"
          autoComplete="off"
          autoCorrect="on"
          autoCapitalize="off"
        />
        <div style={{ textAlign: 'right' }}>
          <Button
            type="submit"
            className="mt2 mb3"
            onSubmit={console.log(initialValues)}
          >
            ODESLAT
          </Button>
        </div>
      </Form>
    </Formik>

    // <Form onSubmit={handleAddCommentFormSubmit}>
    //   <Form.Group controlId="ControlInput1">
    //     <Form.Control
    //       as="textarea"
    //       rows={3}
    //       placeholder="Vlož komentář"
    //
    //     />
    //   </Form.Group>
    //   <Button
    //     className="pull-right"
    //     type="submit"
    //     variant="success"
    //   >
    //     POTVRDIT
    //   </Button>
    // </Form>
  );

  // } else {
  //   return null
  // }
}
