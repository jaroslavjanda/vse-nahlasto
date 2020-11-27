import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const UserImageAndName = (user) => {
  return (
    <Row>
      <Col style={{ textAlign: 'left', maxWidth: '25px' }}>
        <FontAwesomeIcon icon={faUserCircle} />
      </Col>

      {/*TODO Umoznit vypis jmena a prijmeni prihlaseneho uzivatele*/}

      <Col style={{ textAlign: 'left' }}>{user.user.email}</Col>
    </Row>
  )
}
