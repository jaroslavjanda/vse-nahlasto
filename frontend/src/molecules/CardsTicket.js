import React, { useCallback, useState } from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import './CardsTicketStyle.css';
import { getDataFromLocalStorage } from '../utils/localStorage';
import { imgPathForTicket } from 'src/utils/imgPathForTickets';

const RESOLVE_TICKET_MUTATION = gql`
  mutation setTicketResolved($ticketId: Int!) {
    setTicketResolved(ticketId: $ticketId) {
      ticket_id
    }
  }
`;

export const CardsTicket = ({
  item,
  like,
  requestSendLike,
  requestDelete,
  communityOwner,
}) => {
  const [liked, setliked] = useState(like);
  const [enabled, setenabled] = useState(true);
  const user = getDataFromLocalStorage();

  const [resolveTicketRequest] = useMutation(RESOLVE_TICKET_MUTATION, {
    onCompleted: ({ setTicketResolved: ticket_id }) => {
      console.log('Completed', ticket_id);
      window.location.reload();
    },
    onError: ({ setTicketResolved: ticket_id }) => {
      console.log('Error', ticket_id);
    },
  });

  const handleResolveTicket = useCallback(
    (oldVariables) => {
      console.log('variables ticketId', oldVariables.variables);

      const variables = {
        ticketId: oldVariables.variables.ticket_id,
      };

      console.log('new variables', variables.ticket_id);

      resolveTicketRequest({ variables });
    },
    [resolveTicketRequest],
  );

  const history = useHistory()

  if (item.status[0].status_id === 1) {
    const { user } = localStorage;
    return (
      <Card
        className="ticketCardMaxSize"
        style={{ width: '100%', border: '3px solid rgb(40 167 69)' }}
        key={item.title}
      >
        <Card.Img
          style={{ width: '100%' }}
          src={imgPathForTicket('tickets', item.image)}
          className="ticketImageNoBorders"
        />
        <Card.Header className="ticketCardHeaderGreen">
          <Row>
            <Col align="left">
              <Row className="card-header-items">
                {user && user.user.user_id === communityOwner && (
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
          </Row>
        </Card.Header>
        <Card.Body>
          <h3>{item.title}</h3>
          <Card.Text>{item.content}</Card.Text>

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
            className="btn"
          >
            <div style={{ display: 'flex' }}>
              <FontAwesomeIcon icon={faThumbsUp} className="mr2 f4" />
              {liked}
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  } else if (user && user.user.user_id === communityOwner) {
    return (
      <Card
        className="ticketCardMaxSize"
        style={{ width: '100%', border: '3px solid rgb(0 123 254)' }}
        key={item.title}
      >
        <Card.Img
          style={{ width: '100%' }}
          src={imgPathForTicket('tickets', item.image)}
          className="ticketImageNoBorders"
        />
        <Card.Header className="ticketCardHeaderBlue">
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
          </Row>
        </Card.Header>
        <Card.Body>
          <h3>{item.title}</h3>
          <Card.Text>{item.content}</Card.Text>

          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Button
                variant="success"
                onClick={() => {
                  console.log(item.ticket_id);

                  let ticket_id = item.ticket_id;

                  console.log('item.ticket_id', ticket_id);

                  handleResolveTicket({ variables: { ticket_id } });
                }}
              >
                VYŘEŠIT
              </Button>
            </Col>

            <Col xs={2}>
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
                className="btn"
              >
                <div style={{ display: 'flex' }}>
                  <FontAwesomeIcon icon={faThumbsUp} className="mr2 f4" />
                  {liked}
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card
        className="ticketCardMaxSize"
        style={{ width: '100%', border: '3px solid rgb(0 123 254)' }}
        key={item.title}
      >
        <Card.Img
          style={{ width: '100%' }}
          src={imgPathForTicket('tickets', item.image)}
          className="ticketImageNoBorders"
        />
        <Card.Header className="ticketCardHeaderBlue">
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
          </Row>
        </Card.Header>
        <Card.Body>
          <h3>{item.title}</h3>
          <Card.Text>{item.content}</Card.Text>

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
            className="btn"
          >
            <div style={{ display: 'flex' }}>
              <FontAwesomeIcon icon={faThumbsUp} className="mr2 f4" />
              {liked}
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
};
