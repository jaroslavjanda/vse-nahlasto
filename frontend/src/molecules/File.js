import React from 'react';

import { ErrorMessage, FileInput, Label } from 'src/atoms/';

export function File({ id, label, error, ...props }) {
  return (
    <div className="mb2" style={{ textAlign: 'left' }}>
      <Label htmlFor={id}>{label}</Label>
      <FileInput id={id} className="mb1" error={!!error} {...props} />
      {error && <ErrorMessage className="mb1 f6">{error}</ErrorMessage>}
    </div>
  );
}
