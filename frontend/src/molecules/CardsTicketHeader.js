import { Badge, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const CardsTicketHeader = ({
  user,
  isOwner,
  item,
  enabled,
  requestDelete,
  history,
}) => {
  return (
    <>
      <Col align="left">
        <Row className="card-header-items">
          {isOwner && (
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
          <Col>
            <div style={{ color: 'white' }} className="badge">
              {item.date}
            </div>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <Badge variant={item.status[0].code_class}>
              {item.status[0].status}
            </Badge>
          </Col>
        </Row>
      </Col>
    </>
  );
};
