import React from 'react';

import { Heading } from 'src/atoms/';

export function Placeholder({ title, children }) {
  return (
    <>
      <Heading>{title}</Heading>

      {typeof children === 'undefined' ? (
        <p>This page is empty for now...</p>
      ) : (
        children
      )}
    </>
  );
}
