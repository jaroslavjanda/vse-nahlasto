import React from 'react';

export const HeartWithNumber = ({ enabled, liked }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className={`${!enabled ? 'heart-activate' : ''} heart`} />
      <div style={{ fontSize: '20px' }}>{liked}</div>
    </div>
  );
};
