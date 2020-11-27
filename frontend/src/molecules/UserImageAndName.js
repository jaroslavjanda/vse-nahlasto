import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const UserImageAndName = () => {
  return (
    <div>
      <Col style={{ textAlign: 'left', maxWidth: '25px' }}>
        <FontAwesomeIcon icon={faUserCircle} />
      </Col>
      <Col style={{ textAlign: 'left' }}>Jméno Příjmení</Col>
    </div>
  );
};
