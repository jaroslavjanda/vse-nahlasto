import React, { useCallback } from 'react';
import { AddCommentForm, UserImageAndName } from '../molecules'
import { Loading } from '../atoms'
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../utils/auth'
import { useHistory } from 'react-router-dom';

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

export function CommentFormTemplate({ ticketId }) {
    const {user} = useAuth();
    const history = useHistory();

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
    
          addCommentRequest({
            variables: variables,
          })
        }, [addCommentRequest],
      )
  
  
      const initialValues = {
        content: '',
        user_id: 77,
        ticket_id: ticketId
      }
    return (
        <>
        {user && !user.user_id && (
        <div className="mw8 center">
            <UserImageAndName />
            <AddCommentForm
                initialValues={initialValues}
                onSubmit={handleAddCommentFormSubmit}
                isLoading={addCommentRequestState.loading}
                error={addCommentRequestState.error}
            />
        </div>
        )}
        </>
    );
}
