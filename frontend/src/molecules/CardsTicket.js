import React, { useState } from 'react';
import { Card, Badge, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';

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
  const imgSrc = "https://picsum.photos/180/100";
  //TODO: Prep for image showing
  //const imgSrc = item.image? "http://dev.backend.team07.vse.handson.pro/uploads/tickets/"+item.image:"https://picsum.photos/180/100"
  return (
    <Card style={{ width: '100%' }} key={item.title}>
      <Card.Img variant="top" src={imgSrc} />
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
        <Button
          variant="success"
          onClick={() => history.push(`/ticket-detail/${item.ticket_id}`)}
        >
          OPEN
        </Button>
        <div>
          <div
            onClick={() => {
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
            }}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="mr2 f4" />
            {liked}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
