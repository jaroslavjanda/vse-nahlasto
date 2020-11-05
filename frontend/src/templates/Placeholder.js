import React from 'react';

import { Heading, MainSection } from 'src/atoms/';
import { TopNavigation } from 'src/organisms/';

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
