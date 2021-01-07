import { Button } from '../atoms'
import React, { useCallback, useState } from 'react'

import { Form, Formik } from 'formik'
import { FormikTextArea } from './FormikTextArea'
import * as yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { getDataFromLocalStorage } from '../utils/localStorage'

const ADD_COMMENT_MUTATION = gql`
  mutation AddComment(
    $content: String!,
    $user_id: Int!,
    $ticket_id: Int!
  ) {
    addComment(
      content: $content,
      user_id: $user_id,
      ticket_id: $ticket_id
    ) {
      comment_id
    }
  }
`

export function AddCommentForm({ ticket, onCommentSuccess }) {

  let user = getDataFromLocalStorage()?.user
  const [formKey, setFormKey] = useState(0)
  const initialValues = { content: '' }

  const [resolveAddCommentRequest] = useMutation(
    ADD_COMMENT_MUTATION,
    {
      onCompleted: ({ addComment: comment_id }) => {
        setFormKey(formKey + 1)
        onCommentSuccess()
        console.log('Comment was added to the DB, it\'s ID is ' + comment_id)
      },
      onError: () => {
        console.log('Error while adding the Comment to DB')
      },
    },
  )

  const handleAddComment = useCallback(
    (values) => {
      let user = getDataFromLocalStorage()?.user
      const variables = {
        user_id: user.user_id,
        ticket_id: ticket.ticket_id,
        content: values.content,
      }
      resolveAddCommentRequest({ variables })

    },
    [resolveAddCommentRequest],
  )

  const schema = yup.object().shape({
    content: yup.string().required('Vlož komentář.').label('Komentář'),
  })

  return (
    <Formik
      key={formKey}
      onSubmit={handleAddComment}
      initialValues={initialValues}
      validateOnBlur={false}
      validationSchema={schema}
    >
      <Form>
        <FormikTextArea
          id="content"
          name="content"
          type="textArea"
          placeholder="Vlož komentář"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <Button
          style={{ float: 'middle' }}
          type="submit"
          className="mt2 mb3"
        >
          PŘIDAT KOMENTÁŘ
        </Button>
      </Form>
    </Formik>
  )
}
