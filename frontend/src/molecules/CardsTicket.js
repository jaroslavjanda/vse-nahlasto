import React, { useState } from 'react';
import { Card, Badge, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTrashAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';
import { imgPath } from 'src/utils/imgPath';

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

  console.log(item.status[0].status_id)

  if (item.status[0].status_id === 1) {
    return (
      <Card style={{ width: '100%', border: '3px solid rgb(40 167 69)' }} key={item.title}>
        <Card.Img style={{ width: '100%' }} src={imgPath('tickets', item.image)} />
        <Card.Header as="h5" style={{ backgroundColor: '#28a745' }}>
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
                          })
                          history.go(0)
                        }
                      }}
                    />
                  </Button>
                )}
                <div className="badge">{item.date}</div>
              </Row>
            </Col>
            <Badge variant={item.status[0].code_class}>
              {item.status[0].status}
            </Badge>
          </Row>
        </Card.Header>
        <Card.Body>
          <h3>{item.title}</h3>
          <Card.Text>{item.content}</Card.Text>

          {console.log('komentare ', item.comments)}
          {console.log('komentar cislo jedna ', item.comments[0])}
          {console.log('id komentare cislo jedna', item.comments[0].comment_id)}




          {/*<div>*/}
          {/*  {item.comments.map((item) => (*/}
          {/*    <div key={item.comments.comment_id}>*/}
          {/*      <Row>*/}
          {/*        <Col style={{ textAlign: 'left', maxWidth: '25px' }}>*/}
          {/*          <FontAwesomeIcon icon={faUserCircle} />*/}
          {/*        </Col>*/}
          {/*        <Col style={{ textAlign: 'left' }}>*/}
          {/*          <p className="mb-2" style={{ fontWeight: 'bold' }}>*/}
          {/*            /!*{item.user[0].name} {item.user[0].surname}*!/*/}
          {/*          </p>*/}
          {/*          <p>{item.content}</p>*/}
          {/*        </Col>*/}
          {/*      </Row>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}



          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Button
                variant="success"
                onClick={() =>
                  history.push(`/ticket-detail-page/${item.ticket_id}`)
                }
              >
                OPEN
              </Button>
            </Col>

            <Col xs={2}>
              <div
                onClick={() => {
                  if (user) {
                    if (enabled) {
                      setliked(liked + 1)
                      setenabled(false)
                      requestSendLike({
                        variables: {
                          ownerId: user.user_id,
                          ticketId: item.ticket_id,
                        },
                      })
                    } else {
                      setliked(liked - 1)
                      setenabled(true)
                      requestSendLike({
                        variables: {
                          ownerId: user.user_id,
                          ticketId: item.ticket_id,
                        },
                      })
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
    )
  } else {
    return (
      <Card style={{ width: '100%', border: '3px solid rgb(0 123 254)' }} key={item.title}>
        <Card.Img style={{ width: '100%' }} src={imgPath('tickets', item.image)} />
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
                          })
                          history.go(0)
                        }
                      }}
                    />
                  </Button>
                )}
                <div className="badge">{item.date}</div>
              </Row>
            </Col>
            <Badge variant={item.status[0].code_class}>
              {item.status[0].status}
            </Badge>
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
                onClick={() =>
                  history.push(`/ticket-detail-page/${item.ticket_id}`)
                }
              >
                OPEN
              </Button>
            </Col>

            <Col xs={2}>
              <div
                onClick={() => {
                  if (user) {
                    if (enabled) {
                      setliked(liked + 1)
                      setenabled(false)
                      requestSendLike({
                        variables: {
                          ownerId: user.user_id,
                          ticketId: item.ticket_id,
                        },
                      })
                    } else {
                      setliked(liked - 1)
                      setenabled(true)
                      requestSendLike({
                        variables: {
                          ownerId: user.user_id,
                          ticketId: item.ticket_id,
                        },
                      })
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
    )
  }
};
