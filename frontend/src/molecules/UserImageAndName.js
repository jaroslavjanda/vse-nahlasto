import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useAuth } from '../utils/auth'

export const UserImageAndName = () => {

  const { user } = useAuth()

  if ( user != null) {
    return (
      <Row>
        <Col style={{ textAlign: 'left', maxWidth: '25px' }}>
          <FontAwesomeIcon icon={faUserCircle} />
        </Col>
        {/*TODO Umoznit vypis jmena a prijmeni prihlaseneho uzivatele*/}

        <Col style={{ textAlign: 'left', fontWeight: "bold"}}>{user.name} {user.surname}</Col>
      </Row>
    )
  } else {
    return null
  }
}
