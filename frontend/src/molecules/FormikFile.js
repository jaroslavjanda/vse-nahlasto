import React from 'react';
import { useField } from 'formik';

import { File } from './File';

export function FormikFile({ name, ...props }) {
  const [{ value, ...field }, meta, helpers] = useField(name);

  const error = meta.touched && meta.error;

  return (
    <File
      {...field}
      error={error}
      {...props}
      onChange={({ target: { files } }) => {
        if (files.length) {
          helpers.setValue(files[0]);
        } else {
          helpers.setValue(null);
        }
      }}
    />
  );
}
