import { Form } from 'react-bootstrap'
import { Button, ErrorBanner, SuccessBanner } from '../atoms'
import { toast } from 'react-toastify'
import React, { useCallback } from 'react'
import { useAuth } from '../utils/auth'
import { gql, useMutation } from '@apollo/client'
import { Formik, FormikConsumer } from 'formik'
import { FormikField } from './FormikField'
import { text } from '@fortawesome/fontawesome-svg-core'
import { FormikTextArea } from './FormikTextArea'
import * as yup from 'yup'

const ADD_COMMENT_MUTATION = gql`
  mutation AddComment(
    $content: String!
    $user_id: Int!
    $ticket_id: Int!
  ) {
    addComment(
      content: $content
      user_id: $user_id
      ticket_id: $ticket_id
    ) {
      comment_id
    }
  }
`

export function AddCommentForm({ ticket_id, user_id, }) {
  const initialValues = {
    content: '',
    user_id: user_id,
    ticket_id: ticket_id,
  }

  const [addCommentRequest, addCommentRequestState] = useMutation(
    ADD_COMMENT_MUTATION, {
      onCompleted: ({ addComment: { comment_id } }) => {
        console.log(
          'Comment was added to the DB, its ID is' + comment_id,
        )
      },
      onError: () => {
        console.log('Error while adding the comment to DB')
      },
    },
  )


  const handleAddCommentFormSubmit = useCallback(
    (variables) => {
      console.log("KURVAAAA", variables)
      console.log(initialValues.content)

      addCommentRequest({
        variables: variables,
      })
    }, [addCommentRequest],
  )



  // if (user_id != null) {
    return (
      <Formik
        onSubmit={(e) => {
          handleAddCommentFormSubmit()
          e.preventDefault()
        }}
        initialValues={initialValues}
        validateOnBlur={false}
      >
        <Form>
          {addCommentRequestState.error && <ErrorBanner
            title={addCommentRequestState.error} className="mb3" />}
          {addCommentRequestState.data && (<SuccessBanner
            title={'Komentář byl přidán'} className="mb3" />)}
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
          <Button type="submit" className="mt2 mb3">
            ODESLAT
          </Button>
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


    )

  // } else {
  //   return null
  // }
}
