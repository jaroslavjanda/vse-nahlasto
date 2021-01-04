import { gql, useMutation } from '@apollo/client'
import { getDataFromLocalStorage } from '../utils/localStorage'
import React, { useCallback } from 'react'
import { AddCommentForm } from '../molecules'

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

export const AddCommentTemplate = ({ ticket }) => {

  const { user } = getDataFromLocalStorage()

  const initialValues = { content: '' }

  const [resolveAddCommentRequest] = useMutation(
    ADD_COMMENT_MUTATION,
    {
      onCompleted: ({ addComment: comment_id }) => {
        window.location.reload()
        console.log('Comment was added to the DB, it\'s ID is ' + comment_id)
      },
      onError: () => {
        console.log('Error while adding the Comment to DB')
      },
    },
  )

  console.log(user.user_id)
  console.log(ticket.ticket_id)

  const handleAddComment = useCallback(
    (oldVariables) => {
      const variables = {
        user_id: user.user_id,
        comment_id: ticket.ticket_id,
        content: oldVariables.variables.content,
      }

      console.log(variables)

      resolveAddCommentRequest({ variables })
    },
    [resolveAddCommentRequest],
  )

  return (
    <AddCommentForm
      onSubmit={handleAddComment}
      initialValues={initialValues}
    />
  )
}
