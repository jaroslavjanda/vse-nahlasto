import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Container } from 'react-bootstrap'
import { ErrorBanner, Loading } from '../atoms'
import { CommentForm, CommentContent, UserImageAndName, Comment } from '../molecules'
import { useAuth } from '../utils/auth'

const TICKET_DETAIL_QUERY = gql`
  query TicketDetail($ticketId: Int!) {
    ticket(ticketId: $ticketId) {
      user_id
      ticket_id
      title
      date
      image
      content
    }
  }
`

const COMMENT_QUERY = gql`
  query Comment($ticketId: Int!) {
    ticketComment(ticketId: $ticketId) {
      content
      user {
        name
        surname
      }
    }
  }
`

// const UPLOAD_COMMENT = gql`
// mutation CommentUpload($comment: )
// `

export const TicketDetail = ({ match }) => {

  const ticketId = parseInt(match.params.ticketId)
  const ticketState = useQuery(TICKET_DETAIL_QUERY, { variables: { ticketId } })
  const ticket = ticketState.data?.ticket

  const commentState = useQuery(COMMENT_QUERY, { variables: { ticketId } })
  const comments = commentState.data?.ticketComment

  const { user } = useAuth()

  // if (user != null) {
    return (
      <div style={{ textAlign: 'center' }}>
        {ticketState.loading && (
          <Loading />
        )}
        {!ticketState.loading && (
          <div>
            {commentState.loading && (
              <Loading />
            )}

            {!commentState.loading && (
              <div>
                <CommentContent
                  ticketTitle={ ticket.title }
                  ticketContent={ ticket.content }
                  // TODO ticket image parametr bude zde
                />

                <Container className="mt-4">
                  {/*<UserImageAndName*/}
                  {/*  user={ user }*/}
                  {/*/>*/}

                  <CommentForm/>

                </Container>

                {console.log(comments[0].content)}


                <Container className="mt-4">
                  <Comment
                    user={comments[0].user[0]}

                    comment={comments[0].content}
                  />


                </Container>
              </div>
            )}
          </div>
        )}
      </div>)
  // } else {
  //   return (
  //     <ErrorBanner title="Komentáře může zobrazit pouze přihlášený uživatel.">Musíš se přihlásit.</ErrorBanner>
  //   )
  // }


}
