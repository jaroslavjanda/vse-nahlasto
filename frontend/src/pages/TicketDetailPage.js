import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import { useAuth } from 'src/utils/auth';
import { TicketDetailContentTemplate } from 'src/templates/TicketDetailContentTemplate';
import { CommentContentTemplate } from 'src/templates/CommentContentTemplate';
import { CommentFormTemplate } from 'src/templates/CommentFormTemplate';
import { Container } from 'react-bootstrap';
export function TicketDetailPage({ match }) {
  const ticketId = parseInt(match.params.ticketId);

  return (
    <Container>
      <TicketDetailContentTemplate ticketId={ticketId} />
      <CommentFormTemplate ticketId={ticketId} />
      <CommentContentTemplate ticketId={ticketId} />
    </Container>
  );
}
