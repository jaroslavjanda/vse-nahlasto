import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const Comment = (user, comment) => {
  return (
    <Row>
      <Col style={{ textAlign: 'left', maxWidth: '25px' }}>
        <FontAwesomeIcon icon={faUserCircle} />
      </Col>
      <Col style={{ textAlign: 'left' }}>
        <Col style={{ textAlign: 'left' }}>{user.user.name} {user.user.surname}</Col>
        <p style={{ textAlign: 'left', marginTop: '5px' }}>

          {console.log(comment)}

          {/*{comment.content.content}*/}
        </p>
      </Col>
    </Row>
  )
}
