import React from 'react';

import { ErrorMessage, Label, TextInput } from 'src/atoms/';

export function Field({ id, label, error, ...props }) {
  return (
    <div className="measure mb2">
      <Label htmlFor={id}>{label}</Label>
      <TextInput id={id} className="mb1" error={!!error} {...props} />
      {error && <ErrorMessage className="mb1 f6">{error}</ErrorMessage>}
    </div>
  );
}
