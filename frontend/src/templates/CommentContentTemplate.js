import React from 'react';
import { CommentsContent } from '../organisms';
import { Loading } from '../atoms';
import { gql, useQuery } from '@apollo/client';

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

export function CommentContentTemplate({ ticketId }) {
  const commentState = useQuery(COMMENT_QUERY, { variables: { ticketId } });
  const comments = commentState.data?.ticketComment;
  return (
    <>
      {commentState.loading && <Loading />}
      {!commentState.loading && (
        <div className="mw8 center">
          <CommentsContent comments={comments} />
        </div>
      )}
    </>
  );
}
