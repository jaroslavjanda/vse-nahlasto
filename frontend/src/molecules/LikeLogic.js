import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const LikeLogic = ({ item, user, enabled, setliked, setenabled, liked, requestSendLike }) => {
  return (
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
  )
}
