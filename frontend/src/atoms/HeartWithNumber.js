import React from 'react';

export const HeartWithNumber = ({ enabled, liked, isLikedByUser }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className={` 
      ${!enabled ? 'heart-activate' : ''}
      ${enabled && isLikedByUser ? "heart-fill" : "heart" }
       heart`} />
      <div style={{ fontSize: '20px' }}>{liked}</div>
    </div>
  );
};
