import { HeartWithNumber } from '../atoms/HeartWithNumber'
import React from 'react'

export const LikeLogic = ({ item, user, enabled, setliked, liked, setenabled, requestSendLike }) => {
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
      <HeartWithNumber enabled={enabled} liked={liked} />
    </div>
  )


}



