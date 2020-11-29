import React from 'react';

export function MainSection({ children }) {
  return (
    <div className="pa3 bt b--black-10">
      <section className="center">{children}</section>
    </div>
  );
}
