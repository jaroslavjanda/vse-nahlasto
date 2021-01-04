import React from 'react';
import { useField } from 'formik';

import { Label, TextArea } from '../atoms';

export function FormikTextArea({ id, label, name, ...props }) {
  const [field, meta] = useField(name);

  const error = meta.touched && meta.error;

  return (
    <div className="mb2" style={{ textAlign: 'left' }}>
      <Label htmlFor={id}>{label}</Label>
      <TextArea {...field} error={error} {...props} />
    </div>
  );
}
