import React, { useCallback, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import './styles.css'
import { getDataFromLocalStorage } from '../utils/localStorage'
import { imgPathForTicket } from 'src/utils/imgPathForTickets'
import { CardsTicketHeader } from './CardsTicketHeader'
import { LikeLogic } from './LikeLogic'
import { TicketComment } from './TicketComment'
import { AddCommentForm } from './AddCommentForm'


export const CardsTicketBody = ({
                              item,
                              like,
                              requestSendLike,
                              requestDelete,
                              communityOwner,
                              toCommunityButton,
                              toSolveButton,
                              handleResolveTicket
                            }) => {

//border of card
let cardBorder = item.status[0].status_id === 1? '3px solid rgb(40 167 69)':'3px solid rgb(0 123 254)'
let cardHeader = item.status[0].status_id === 1? "ticketCardHeaderGreen":"ticketCardHeaderBlue"
let user = getDataFromLocalStorage()?.user
var userId = user ? parseInt(user.user_id) : undefined;
if (userId === undefined) userId = 0;

let isOwner = userId === communityOwner
const history = useHistory()
const [liked, setliked] = useState(like)
const [enabled, setenabled] = useState(true)

return(

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
        communityOwner={communityOwner}
        item={item}
        enabled={enabled}
        requestDelete={requestDelete}
        history={history}
      />
    </Card.Header>

    <Card.Body>
      <h3>{item.title}</h3>
      <Card.Text>{item.content}</Card.Text>
      <Col className="mb-3">
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
      {toSolveButton && (
      <Col className="mb-3">
        <Button
          variant="success"
          onClick={() => {
            let ticket_id = item.ticket_id
            handleResolveTicket({ variables: { ticket_id } })
          }}
        >
          VYŘEŠIT PROBLÉM
        </Button>
      </Col>
      )} 

      <TicketComment
        ticket={item}
        user={user}
      />  
      {isOwner && (
        <AddCommentForm
          ticket={item}
        /> 
      )}     
    </Card.Body>
  </Card>

                              )

  //if status is completed
  if (item.status[0].status_id === 1) {
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
          <CardsTicketHeader
            user={user}
            communityOwner={communityOwner}
            item={item}
            enabled={enabled}
            requestDelete={requestDelete}
            history={history}
          />
        </Card.Header>

        <Card.Body>
          <h3>{item.title}</h3>
          <Card.Text>{item.content}</Card.Text>

          <LikeLogic
            className="mb-3"
            item={item}
            user={user}
            enabled={enabled}
            setliked={setliked}
            setenabled={setenabled}
            liked={liked}
            requestSendLike={requestSendLike}
          />

          <TicketComment
            ticket={item}
          />        
        </Card.Body>
      </Card>
    )
  }
  // if user is owner of the ticket 
  else if (user && user.user_id === communityOwner) {
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
          <CardsTicketHeader
            user={user}
            communityOwner={communityOwner}
            item={item}
            enabled={enabled}
            requestDelete={requestDelete}
            history={history}
          />
        </Card.Header>
        <Card.Body>
          <h3>{item.title}</h3>
          <Card.Text>{item.content}</Card.Text>

          <Col className="mb-3">
              <Button
                variant="success"
                onClick={() => {
                  console.log(item.ticket_id)

                  let ticket_id = item.ticket_id

                  console.log('item.ticket_id', ticket_id)

                  handleResolveTicket({ variables: { ticket_id } })
                }}
              >
                VYŘEŠIT PROBLÉM
              </Button>
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

          <TicketComment
            user={user}
            ticket={item}
          />

          <AddCommentForm
            ticket={item}
          />

        </Card.Body>
      </Card>
    )
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
          <CardsTicketHeader
              user={user}
              communityOwner={communityOwner}
              item={item}
              enabled={enabled}
              requestDelete={requestDelete}
              history={history}
            />
        </Card.Header>
        <Card.Body>

          <h3>{item.title}</h3>
          <Card.Text>{item.content}</Card.Text>

          <LikeLogic
            className="mb-3"
            item={item}
            user={user}
            enabled={enabled}
            setliked={setliked}
            setenabled={setenabled}
            liked={liked}
            requestSendLike={requestSendLike}
          />

          <TicketComment
            ticket={item}
          />
        </Card.Body>
      </Card>
    )
  }
}
