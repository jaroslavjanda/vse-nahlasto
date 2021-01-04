import { Form } from 'react-bootstrap'
import { Button } from '../atoms'
import React from 'react'

import { Formik } from 'formik'
import { FormikTextArea } from './FormikTextArea'
import * as yup from 'yup'

export function AddCommentForm({ onSubmit, initialValues }) {

  const schema = yup.object().shape({
    content: yup.string().required('Vlož komentář.').label('Komentář'),
  })

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validateOnBlur={false}
      validationSchema={schema}
    >
      <Form>
        <FormikTextArea
          style={{ marginLeft: '40px' }}
          id="content"
          name="content"
          type="textArea"
          rows={3}
          placeholder="Vlož komentář"
          autoComplete="off"
          autoCorrect="on"
          autoCapitalize="off"
        />
        <Button
          type="submit"
          className="mt2 mb3"
        >
          PŘIDAT KOMENTÁŘ
        </Button>
      </Form>
    </Formik>
  )
}
