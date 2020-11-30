import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import { useAuth } from 'src/utils/auth';
import { TicketDetailContentTemplate } from 'src/templates/TicketDetailContentTemplate';
import { CommentContentTemplate } from 'src/templates/CommentContentTemplate';
import { CommentFormTemplate } from 'src/templates/CommentFormTemplate';


export function TicketDetailPage({ match }) {

  const ticketId = parseInt(match.params.ticketId)

  return (
      <>
    <TicketDetailContentTemplate ticketId={ticketId}/>
    <CommentFormTemplate ticketId={ticketId}/>
    <CommentContentTemplate ticketId={ticketId}/>
    
    </>
  );
}
