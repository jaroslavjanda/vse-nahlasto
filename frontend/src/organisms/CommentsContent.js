import React from 'react';
import { Comment } from '../molecules';
import { Container } from 'react-bootstrap';

export function CommentsContent({ comments }) {
  return (
    <>
      <div className="mw8 center">
        <Container className="mt-4">
          <Comment comments={comments} />
        </Container>
      </div>
    </>
  );
}
