import React, { useState } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './styles.css'
import { getDataFromLocalStorage } from '../utils/localStorage'
import { imgPathForTicket } from 'src/utils/imgPathForTickets'
import { CardsTicketHeader } from './CardsTicketHeader'
import { LikeLogic } from './LikeLogic'
import { TicketComment } from './TicketComment'


export const CardsTicketBody = ({
                                  item,
                                  like,
                                  requestSendLike,
                                  requestDelete,
                                  isOwner,
                                  toCommunityButton,
                                  handleResolveTicket,
                                }) => {

//border of card
  let cardBorder = item.status[0].status_id === 1 ? '3px solid rgb(40 167 69)' : '3px solid rgb(0 123 254)'
  let cardHeader = item.status[0].status_id === 1 ? 'ticketCardHeaderGreen' : 'ticketCardHeaderBlue'
  let user = getDataFromLocalStorage()?.user
  const history = useHistory()
  const [liked, setliked] = useState(like)
  const [enabled, setenabled] = useState(true)

  const canUserResolveOrComment = (isOwner && item.status[0].status_id === 3)

  return (

    <Card
      className="ticketCardMaxSize"
      style={{ width: '100%', border: cardBorder }}
      key={item.title}
    >
      <Card.Img
        style={{ width: '100%' }}
        src={imgPathForTicket('tickets', item.image)}
        className="ticketImageNoBorders"
      />
      <Card.Header className={cardHeader}>
        <CardsTicketHeader
          user={user}
          isOwner={isOwner}
          item={item}
          enabled={enabled}
          requestDelete={requestDelete}
          history={history}
        />
      </Card.Header>

      <Card.Body>
        <h3>{item.title}</h3>
        <Card.Text>{item.content}</Card.Text>
        <Col>
          <LikeLogic
            item={item}
            user={user}
            enabled={enabled}
            setliked={setliked}
            setenabled={setenabled}
            liked={liked}
            requestSendLike={requestSendLike}
          />
        </Col>
        {toCommunityButton && (
          <Col className="mb-3">
            <Button
              variant="success"
              onClick={() =>
                history.push(`/community-detail/${item.community_id}`)
              }
            >
              Do komunity
            </Button>
          </Col>
        )}
        <TicketComment
          ticket={item}
          canUserResolveOrComment={canUserResolveOrComment}
        />
        {canUserResolveOrComment && (
          <Col className="mb-3">
            <Button
              className="resolveTicketButton"
              onClick={() => {
              let ticket_id = item.ticket_id
              handleResolveTicket({ variables: { ticket_id } })
            }}
            >
              VYŘEŠIT PROBLÉM
            </Button>
          </Col>
        )}
      </Card.Body>
    </Card>

  )
}
