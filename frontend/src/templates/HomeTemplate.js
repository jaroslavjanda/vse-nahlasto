import React from 'react';
import { Spinner } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { Heading } from 'src/atoms/';
import { QuackForm } from 'src/molecules/';

export function HomeTemplate({ data, quackFormState, currentUser }) {
  return (
    <>
      <Heading>
        Home <FontAwesomeIcon icon={faCoffee} />
      </Heading>
      {currentUser && <QuackForm {...quackFormState} />}
      {data && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </>
  );
}
