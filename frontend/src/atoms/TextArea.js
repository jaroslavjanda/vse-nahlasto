import React from 'react';
import classNames from 'classnames';
import { ErrorMessage } from 'src/atoms';

export function TextArea({ className, error, ...rest }) {
  return (
    <div>
      <textarea
        className={classNames(
          'db border-box w-100 measure-wide ba b--black-20 br2',
          className,
        )}
        {...rest}
      />
      {error && <ErrorMessage className="mb1 f6">{error}</ErrorMessage>}
    </div>
  );
}
