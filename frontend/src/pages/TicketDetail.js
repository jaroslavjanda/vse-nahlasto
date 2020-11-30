import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Container } from 'react-bootstrap'
import { Loading } from '../atoms'
import { AddCommentForm, TicketDetailContent, Comment, UserImageAndName, ChangeTicketState } from '../molecules'
import { useAuth } from '../utils/auth'
import { parseValue } from 'graphql'

const TICKET_DETAIL_QUERY = gql`
  query TicketDetail($ticketId: Int!) {
    ticket(ticketId: $ticketId) {
      user_id
      ticket_id
      title
      date
      image
      content
      community_id
    }
  }
`

const COMMENT_QUERY = gql`
  query Comment($ticketId: Int!) {
    ticketComment(ticketId: $ticketId) {
      comment_id
      content
      user {
        name
        surname
      }
    }
  }
`

const COMMUNITY_OWNER_QUERY = gql`
  query CommunityOwnerId($communityId: Int!) {
    communityOwnerId(communityId: $communityId)
  }
`

export const TicketDetail = ({ match }) => {

  const ticketId = parseInt(match.params.ticketId)
  const ticketState = useQuery(TICKET_DETAIL_QUERY, { variables: { ticketId } })
  const ticket = ticketState.data?.ticket

  const commentState = useQuery(COMMENT_QUERY, { variables: { ticketId } })
  const comments = commentState.data?.ticketComment

  const { user } = useAuth()


  const communityId = ticket?.community_id

  console.log("co je kurva", communityId)


  const communityOwnerState = useQuery(COMMUNITY_OWNER_QUERY, {variables: { communityId: communityId }})

  console.log(communityOwnerState)

  const communityOwner = communityOwnerState.data?.communityOwnerId

  console.log(communityOwner)




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
              <TicketDetailContent
                ticket={ticket}
              />

              <Container className="mt-4">
                <ChangeTicketState
                  user = { user }
                  owner_id = { communityOwner }
                />
                <UserImageAndName />
                <AddCommentForm
                  ticket_id={1}
                  user_id = {77}
                  // user = { user }
                />
              </Container>

              <Container className="mt-4">
                <Comment comments={ comments } />
              </Container>
            </div>
          )}
        </div>
      )}
    </div>)
}
