import { HeartWithNumber } from '../atoms/HeartWithNumber';
import React, { useState } from 'react';



export const LikeLogic = ({
  item,
  user,
  enabled,
  setliked,
  liked,
  setenabled,
  requestSendLike,
  isLikedByUser,
}) => {
  const [isLikedByUserState,setIsLikedByUserState] = useState(isLikedByUser)
  return (
    <div
      onClick={() => {
        if (user) {
          if (enabled && !isLikedByUserState) {
            setliked(liked + 1);
            setenabled(false);
            setIsLikedByUserState(!isLikedByUserState)
            requestSendLike({
              variables: {
                ownerId: user.user_id,
                ticketId: item.ticket_id,
              },
            });
          } else {
            setliked(liked - 1);
            setenabled(true);
            setIsLikedByUserState(!isLikedByUserState)
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
      <HeartWithNumber enabled={enabled} liked={liked} isLikedByUser={isLikedByUserState} />
    </div>
  );
};
