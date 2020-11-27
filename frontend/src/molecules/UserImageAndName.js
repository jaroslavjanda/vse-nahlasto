import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const UserImageAndName = (user) => {
  return (
    <Row>

      {console.log(user)}

      {console.log(user.user.name)}
      {console.log(user.user.surname)}
      <Col style={{ textAlign: 'left', maxWidth: '25px' }}>
        <FontAwesomeIcon icon={faUserCircle} />
      </Col>
      <Col style={{ textAlign: 'left' }}>{user.user.name} {user.user.surname}</Col>
    </Row>
  )
}
