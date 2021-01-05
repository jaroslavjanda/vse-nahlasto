import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const Comment = ({ comments }) => {
  return (
    <div>
      {comments.map((item) => (
        <div key={item.comment_id}>
          <Row>
            <Col style={{ textAlign: 'left', maxWidth: '25px' }}>
              <FontAwesomeIcon icon={faUserCircle} />
            </Col>

            <Col className='ml-3' style={{ textAlign: 'left' }}>
              <Row style={{ fontWeight: 'bold' }}>
                {item.user[0].name} {item.user[0].surname}
              </Row>
              <Row style={{ fontSize: 'small', color: 'grey' }}>
                {item.date}
              </Row>
              <Row className="mt-2 mb-3">{item.content}</Row>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  )
}
