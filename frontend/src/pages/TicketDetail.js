import React, { useCallback } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Container } from 'react-bootstrap';
import { Loading } from '../atoms';
import { AddCommentForm, Comment, TicketDetailContent, UserImageAndName } from '../molecules';

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
`;

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
`;

const COMMUNITY_OWNER_QUERY = gql`
  query CommunityOwnerId($communityId: Int!) {
    communityOwnerId(communityId: $communityId)
  }
`;

const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($content: String!, $user_id: Int!, $ticket_id: Int!) {
    addComment(content: $content, user_id: $user_id, ticket_id: $ticket_id) {
      comment_id
    }
  }
`;

export const TicketDetail = ({ match }) => {
  const ticketId = parseInt(match.params.ticketId);
  const ticketState = useQuery(TICKET_DETAIL_QUERY, {
    variables: { ticketId },
  });
  const ticket = ticketState.data?.ticket;

  const commentState = useQuery(COMMENT_QUERY, { variables: { ticketId } });
  const comments = commentState.data?.ticketComment;

  const communityId = ticket?.community_id;

  const communityOwnerState = useQuery(COMMUNITY_OWNER_QUERY, {
    variables: { communityId: communityId },
  });

  const communityOwner = communityOwnerState.data?.communityOwnerId;

  const [addCommentRequest, addCommentRequestState] = useMutation(
    ADD_COMMENT_MUTATION,
    {
      onCompleted: ({ addComment: { comment_id } }) => {
        console.log('Comment was added to the DB, its ID is' + comment_id);
      },
      onError: () => {
        console.log('Error while adding the comment to DB');
      },
    },
  );

  const handleAddCommentFormSubmit = useCallback(
    (variables) => {
      addCommentRequest({
        variables: variables,
      });
    },
    [addCommentRequest],
  );

  return (
    <div style={{ textAlign: 'center' }}>
      {ticketState.loading && (<Loading />)}
      {!ticketState.loading && (
        <div>
          {commentState.loading && (<Loading />)}
          {!commentState.loading && (
            <div>
              <TicketDetailContent ticket={ticket} />

              <Container className="mt-4">
                <UserImageAndName />
                <AddCommentForm
                  ticket_id={1}
                  user_id={77}
                  onSubmit={handleAddCommentFormSubmit}
                  isLoading={addCommentRequestState.loading}
                  error={addCommentRequestState.error}
                />
              </Container>

              <Container className="mt-4">
                <Comment comments={comments} />
              </Container>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
