import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AddTicketTemplate } from '../templates/AddTicketTemplate';

const ADD_TICKET_MUTATION = gql`
  mutation AddTicket(
#    TODO get logged user ID and ID of the community 
#    $ownerId: Int!,
#    $communityId: Int!,
    $title: String!, $content: String!) {
    addTicket(ownerId: 1, communityId: 1, title: $title, content: $content) {
      ticket_id
    }
  }
`;

export const AddTicket = () => {

  const [addTicketRequest, addTicketRequestState] = useMutation(
    ADD_TICKET_MUTATION, {
      onCompleted: ({ addTicket: { ticket_id } }) => {
        console.log('Ticket was added to the DB, it\'s ID is ' + ticket_id);
      },
      onError: () => {
        console.log('Error while adding the ticket to DB');
      },
    },
  );

  const handleAddTicketFormSubmit = useCallback(
    (variables) => {

      addTicketRequest({ variables });
    },
    [addTicketRequest()],
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
