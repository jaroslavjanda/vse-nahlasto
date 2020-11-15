import React from 'react';
import classNames from 'classnames';

export function FileInput({ className, error, ...props }) {
  return (
    <input
      id="file" 
      name="file"
      type="file"
      className={classNames(
        'border-box input-reset ba pa2 db w-100',
        error ? 'b--red' : 'b--black-20',
        className,
      )}
      {...props}
      onChange={(event) => {
        //setFieldValue("file", event.currentTarget.files[0]);
      }}
    />
  );
}
