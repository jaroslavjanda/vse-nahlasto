import React from 'react';
import { useField } from 'formik';

import { TextArea, Label } from '../atoms';

export function FormikTextArea({ id, label, name, ...props }) {
  const [field, meta] = useField(name);

  const error = meta.touched && meta.error;

  return (
    <div className="measure mb2">
      <Label htmlFor={id}>{label}</Label>
      <TextArea {...field} error={error} {...props} />
    </div>
  );
}
