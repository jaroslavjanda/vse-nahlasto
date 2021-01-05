import React, { useCallback, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import './styles.css'
import { getDataFromLocalStorage } from '../utils/localStorage'
import { imgPathForTicket } from 'src/utils/imgPathForTickets'
import { CardsTicketBody } from './CardsTicketBody'
import { LikeLogic } from './LikeLogic'
import { TicketComment } from './TicketComment'
import { AddCommentForm } from './AddCommentForm'



export const CardsTicket = ({
                              item,
                              like,
                              requestSendLike,
                              requestDelete,
                              communityOwner,
                              toCommunityButton,
                              toSolveButton,
                              handleResolveTicket
                            }) => {

  return(

  <CardsTicketBody 
    item={item} 
    like={like}
    requestSendLike={requestSendLike}
    requestDelete={requestDelete} 
    communityOwner={communityOwner}
    toCommunityButton={toCommunityButton}
    toSolveButton={toSolveButton}
    handleResolveTicket={handleResolveTicket}
    />

  )}