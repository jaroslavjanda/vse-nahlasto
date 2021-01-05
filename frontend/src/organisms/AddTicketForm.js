import React from 'react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { Button, ErrorBanner, SuccessBanner } from 'src/atoms/'
import { FormikField } from 'src/molecules/FormikField'
import { FormikTextArea } from '../molecules/FormikTextArea'
import { FormikFile } from '../molecules/FormikFile'
import { getDataFromLocalStorage } from '../utils/localStorage'

export function AddTicketForm({
                                errorMessage,
                                successMessage,
                                onSubmit,
                                className,
                              }) {
  let user = getDataFromLocalStorage()?.user

  const initialValues = {
    title: '',
    content: '',
    file: '',
    email: '',
    showEmail: !user,
  }
  //TODO překlad - "is a required field", jak přeložit
  const schema = yup.object().shape({
    content: yup.string().required('Obsah je povinný.').label('Popis'),
    title: yup.string().required('Název je povinný.').label('Název'),
    email: yup
      .string()
      .email()
      .when('showEmail', {
        is: true,
        then: yup.string().required('Tohle není validní emailová adresa.'),
      }),
  })

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
              <SuccessBanner title={'Příspěvek byl přidán.'} className="mb3" />
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
            <FormikFile id="file" name="file" label="Obrázek" />

            <Button type="submit" className="mt2 mb3">
              Přidat příspěvek
            </Button>
          </Form>
        </Col>
      </Row>
    </Formik>
  )
}
