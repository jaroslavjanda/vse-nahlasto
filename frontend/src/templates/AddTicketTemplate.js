import React from 'react';
import { Container } from 'react-bootstrap';
import { Heading } from 'src/atoms';
import { AddTicketForm } from '../organisms/AddTicketForm';

export function AddTicketTemplate({ isDone, error, onSubmit }) {
  if (error) {
    switch (error.message) {
      case 'Cannot return null for non-nullable field Mutation.resetUserPassword.':
        error.message = 'Uživatel nebyl nalezen. Jste přihlášen?';
        break;
      default:
    }
  }

  return (
    <Container className="mw6 center">
      <Heading>Přidat příspěvek</Heading>
      <AddTicketForm
        errorMessage={error && error.message}
        successMessage={isDone}
        onSubmit={onSubmit}
        className="mt3"
      />
    </Container>
  );
}
