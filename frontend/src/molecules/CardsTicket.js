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

const RESOLVE_TICKET_MUTATION = gql`
  mutation setTicketResolved($ticketId: Int!) {
    setTicketResolved(ticketId: $ticketId) {
      ticket_id
    }
  }
`

export const CardsTicket = ({
                              item,
                              like,
                              requestSendLike,
                              requestDelete,
                              communityOwner,
                            }) => {
  const [liked, setliked] = useState(like)
  const [enabled, setenabled] = useState(true)
  let user = getDataFromLocalStorage()?.user

  const [resolveTicketRequest] = useMutation(RESOLVE_TICKET_MUTATION, {
    onCompleted: ({ setTicketResolved: ticket_id }) => {
      window.location.reload()
    },
    onError: ({ setTicketResolved: ticket_id }) => {
      console.log('Error', ticket_id)
    },
  })

  const handleResolveTicket = useCallback(
    (oldVariables) => {
      const variables = {
        ticketId: oldVariables.variables.ticket_id,
      }

      resolveTicketRequest({ variables })
    },
    [resolveTicketRequest],
  )

  const history = useHistory()

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
  } else if (user && user.user_id === communityOwner) {
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

          <Row className="mb-3">
            <Col xs={2}></Col>
            <Col xs={8}>
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
            </Col>

            <Col xs={2}>
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
          </Row>

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
