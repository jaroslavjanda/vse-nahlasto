import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Loading } from '../atoms'
import { Comment } from './Comment'
import { AddCommentForm } from './AddCommentForm'


const COMMENT_QUERY = gql`
  query Comment($ticketId: Int!) {
    ticketComment(ticketId: $ticketId) {
      comment_id
      content
      date
      user {
        name
        surname
      }
    }
  }
`

export const TicketComment = ({ ticket, canUserResolveOrComment }) => {

  const ticketId = ticket.ticket_id
  const commentState = useQuery(COMMENT_QUERY, { variables: { ticketId } })
  const comments = commentState.data?.ticketComment


  return (
    <>
      {commentState.loading && <Loading />}
      {!commentState.loading && (
        <>
          <Comment comments={comments} />
          {canUserResolveOrComment && (
            <AddCommentForm
              onCommentSuccess={() => commentState.refetch()}
              ticket={ticket}
            />
          )}
        </>
      )}
    </>
  )
}
