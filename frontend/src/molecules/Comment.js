import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const Comment = ({comments}) => {
  return (
    <div>
      {comments.map((item) =>(
        <div key={item.comment_id}>
          <Row>
            <Col style={{ textAlign: 'left', maxWidth: '25px' }}>
              <FontAwesomeIcon icon={faUserCircle} />
            </Col>
            <Col style={{ textAlign: 'left' }}>
              <p className="mb-2" style={{ fontWeight: "bold" }}>{item.user[0].name} {item.user[0].surname}</p>
              <p>{item.content}</p>
            </Col>
          </Row>
        </div>
        )
      )}
    </div>
  )
}
