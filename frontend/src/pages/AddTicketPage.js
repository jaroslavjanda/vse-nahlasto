import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AddTicketTemplate } from '../templates/AddTicketTemplate';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';

const ADD_TICKET_MUTATION = gql`
  mutation AddTicket(
    $user_id: Int!
    $community_id: Int!
    $title: String!
    $content: String!
    $image: Upload!
    $status: Int!
  ) {
    addTicket(
      user_id: $user_id
      community_id: $community_id
      title: $title
      content: $content
      image: $image
      status_id: $status
    ) {
      ticket_id
    }
  }
`;

const UPLOAD_MUTATION = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) 
  }
`;

export const AddTicket = ({ match }) => {
  const communityId = parseInt(match.params.communityId);
  const auth = useAuth();
  const history = useHistory();

  const [addTicketRequest, addTicketRequestState] = useMutation(
    ADD_TICKET_MUTATION,
    {
      onCompleted: ({ addTicket: { ticket_id } }) => {
        console.log("Ticket was added to the DB, it's ID is " + ticket_id);
        history.replace('/community-detail/' + communityId);
      },
      onError: () => {
        console.log('Error while adding the ticket to DB');
      },
    },
  );

  //const [addFileRequest] = useMutation(UPLOAD_MUTATION);

  const handleAddTicketFormSubmit = useCallback(
    (oldVariables) => {
      const variables = {
        user_id: auth.user ? auth.user.user_id : 1,
        community_id: communityId,
        title: oldVariables.title,
        content: oldVariables.content,
        image: oldVariables.file,
        status: 3,
      };

      //addFileRequest({ variables: { file: oldVariables.file } });
      addTicketRequest({ variables });
    },
    [addTicketRequest],
  );

  return (
    <AddTicketTemplate
      isDone={addTicketRequestState.data}
      error={addTicketRequestState.error}
      onSubmit={handleAddTicketFormSubmit}
    />
  );
};
