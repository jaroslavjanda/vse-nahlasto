import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AddTicketTemplate } from '../templates/AddTicketTemplate';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';

const ADD_TICKET_MUTATION = gql`
  mutation AddTicket(
    $user_id: Int!,
    $community_id: Int!,
    $title: String!
    $content: String!
    $image: String!
    $status: Int!
  ) {
    addTicket(user_id: $user_id, community_id: $community_id, title: $title, content: $content, image: $image, status_id: $status) {
      ticket_id
    }
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
        history.replace('/community-detail/'+communityId);
      },
      onError: () => {
        console.log('Error while adding the ticket to DB');
      },
    },
  );

  const handleAddTicketFormSubmit = useCallback(
    (oldVariables) => {

      const variables = {
        user_id: auth.user?auth.user.user_id:1,
        community_id: communityId,
        title: oldVariables.title,
        content: oldVariables.content,
        image: oldVariables.file.replace('C:\\fakepath\\',''),
        status: 3
      }
      
      console.log(variables)
      
      addTicketRequest({variables});
    },
    [addTicketRequest],
  );

  return (
    <AddTicketTemplate
      isDone={addTicketRequestState.data}
      error={addTicketRequestState.error}
      onSubmit={handleAddTicketFormSubmit}
    />

    // <div>
    //   {errorMessage && <ErrorBanner title={errorMessage.message} className="mb3" />}
    //   {successMessage && (
    //     <SuccessBanner
    //       title={'Success! Your ticket was added.'}
    //       className="mb3"
    //     />
    //   )}
    //   <h1>Add Ticket</h1>
    //   <Form onSubmit={handleAddTicketFormSubmit}>
    //     <Form.Group controlId="exampleForm.ControlInput1">
    //       {/*<Form.Label>Email address</Form.Label>*/}
    //       {/*<Form.Control type="email" placeholder="name@example.com"/>*/}
    //     </Form.Group>
    //     <Form.Group controlId="exampleForm.ControlSelect1">
    //       <Form.Label>Example select</Form.Label>
    //       <Form.Control as="select">
    //         <option>1</option>
    //         <option>2</option>
    //         <option>3</option>
    //         <option>4</option>
    //         <option>5</option>
    //       </Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId="exampleForm.ControlSelect2">
    //       <Form.Label>Example multiple select</Form.Label>
    //       <Form.Control as="select" multiple>
    //         <option>1</option>
    //         <option>2</option>
    //         <option>3</option>
    //         <option>4</option>
    //         <option>5</option>
    //       </Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId="exampleForm.ControlTextarea1">
    //       <Form.Label>Title</Form.Label>
    //       <Form.Control id="title" as="textarea" rows={1}/>
    //       <Form.Label>Content</Form.Label>
    //       <Form.Control id="content" as="textarea" rows={3}/>
    //     </Form.Group>
    //     <Button type="submit">Publish ticket</Button>
    //   </Form>
    // </div>
  );
};
