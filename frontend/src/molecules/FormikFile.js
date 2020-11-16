import React from 'react';
import { useField } from 'formik';

import { File } from './File';

export function FormikFile({ name, ...props }) {
  const [field, meta] = useField(name);

  const error = meta.touched && meta.error;

  return <File {...field} error={error} {...props} />;
}
