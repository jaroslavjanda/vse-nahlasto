import React from 'react';
import { useField } from 'formik';

import { TextArea } from '../atoms';

export function FormikTextArea({ name, ...props }) {
  const [field, meta] = useField(name);

  const error = meta.touched && meta.error;

  return <TextArea {...field} error={error} {...props} />;
}
