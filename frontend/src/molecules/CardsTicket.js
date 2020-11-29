import React, { useState } from 'react';
import { Card, Badge, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';
import { imgPath } from 'src/utils/imgPath'

export const CardsTicket = ({
  item,
  like,
  requestSendLike,
  requestDelete,
  communityOwner,
}) => {
  const [liked, setliked] = useState(like);
  const [enabled, setenabled] = useState(true);
  const { user } = useAuth();
  const history = useHistory();
  return (
    <Card style={{ width: '100%' }} key={item.title}>
      <Card.Img variant="top" src={imgPath("tickets",item.image)} />
      <Card.Header as="h5">
        <Row>
          <Col align="left">
            <Row className="card-header-items">
              {user && user.user_id === communityOwner && (
                <Button variant="danger" className="btn-sm">
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="f4"
                    onClick={() => {
                      if (enabled && user) {
                        requestDelete({
                          variables: {
                            ticketId: item.ticket_id,
                            communityId: item.community_id,
                            userId: user.user_id,
                          },
                        });
                        history.go(0);
                      }
                    }}
                  />
                </Button>
              )}
              <div className="badge">{item.date}</div>
            </Row>
          </Col>
          <Col>
            <Row align="right" style={{ display: 'block' }}>
              <Badge variant={item.status[0].code_class}>{item.status[0].status}</Badge>
            </Row>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <h3>{item.title}</h3>
        <Card.Text>{item.content}</Card.Text>
        
        <Row>
          <Col xs={2}>
          </Col>
          <Col xs={8}>
            <Button
              variant="success"
              onClick={() => history.push(`/ticket-detail/${item.ticket_id}`)}
            >
              OPEN
            </Button>
          </Col>
        
          <Col xs={2}>
            <div onClick={() => {
              if (user) {
                if (enabled) {
                  setliked(liked + 1);
                  setenabled(false);
                  requestSendLike({
                    variables: {
                      ownerId: user.user_id,
                      ticketId: item.ticket_id,
                    },
                  });
                } else {
                  setliked(liked - 1);
                  setenabled(true);
                  requestSendLike({
                    variables: {
                      ownerId: user.user_id,
                      ticketId: item.ticket_id,
                    },
                  });
                }
              }
            }}  className="btn">
              <div style={{display: "flex"}}>
                <FontAwesomeIcon icon={faThumbsUp} className="mr2 f4" />
              {liked}
              </div>
            
            </div>
            
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
