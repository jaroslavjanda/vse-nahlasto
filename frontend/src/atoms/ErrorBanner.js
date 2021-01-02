import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ErrorType, errorMessage } from '../utils/Error';

export function ErrorBanner({ className, title, children, ...props }) {
  return (
    <div
      className={classNames('pa4 bg-washed-red dark-red', className)}
      {...props}
    >
      <div
        className={classNames('flex items-center justify-center f5 b', {
          mb3: !!children,
        })}
      >
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <span className="lh-title ml3">
          {title || errorMessage(ErrorType.UNKNOWN)}
        </span>
      </div>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
