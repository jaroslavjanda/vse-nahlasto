import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AddTicketTemplate } from '../templates/AddTicketTemplate';
import { useHistory } from 'react-router-dom';
import { getDataFromLocalStorage } from '../utils/localStorage';

const ADD_TICKET_MUTATION = gql`
  mutation AddTicket(
    $user_id: Int!
    $community_id: Int!
    $title: String!
    $content: String!
    $image: Upload
    $status: Int!
    $email: String
  ) {
    addTicket(
      user_id: $user_id
      community_id: $community_id
      title: $title
      content: $content
      image: $image
      status_id: $status
      email: $email
    ) {
      ticket_id
    }
  }
`;

export const AddTicket = ({ match }) => {
  let user = getDataFromLocalStorage()?.user;
  const communityId = parseInt(match.params.communityId);
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

  const handleAddTicketFormSubmit = useCallback(
    (oldVariables) => {
      console.log(oldVariables);
      const variables = {
        user_id: user ? user.user_id : 25085,
        community_id: communityId,
        title: oldVariables.title,
        content: oldVariables.content,
        image: oldVariables.file ? oldVariables.file : null,
        status: 3,
        email: oldVariables.email,
      };
      addTicketRequest({ variables });
    },
    [addTicketRequest, communityId, user],
  );

  return (
    <AddTicketTemplate
      isDone={addTicketRequestState.data}
      error={addTicketRequestState.error}
      onSubmit={handleAddTicketFormSubmit}
    />
  );
};
