import { Col, Row } from 'react-bootstrap'
import React from 'react'

export const UserImageAndName = ({ user }) => {

  return (
    <Row>
      <Col style={{ textAlign: 'left', fontWeight: 'bold' }}>
        {user.name} {user.surname}
      </Col>
    </Row>
  )
}
