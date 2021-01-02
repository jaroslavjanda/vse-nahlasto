import React from 'react';
import { Spinner } from 'react-bootstrap';

export function Loading() {
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Načítání...</span>
    </Spinner>
  );
}
