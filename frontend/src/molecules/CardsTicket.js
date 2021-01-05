import React from 'react'
import './styles.css'
import { CardsTicketBody } from './CardsTicketBody'

export const CardsTicket = ({
                              item,
                              like,
                              requestSendLike,
                              requestDelete,
                              isOwner,
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
    isOwner={isOwner}
    toCommunityButton={toCommunityButton}
    toSolveButton={toSolveButton}
    handleResolveTicket={handleResolveTicket}
    />

  )}