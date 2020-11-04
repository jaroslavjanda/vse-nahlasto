import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBacon } from '@fortawesome/free-solid-svg-icons';

export function SuccessBanner({ className, title, children, ...props }) {
  return (
    <div
      className={classNames('pa4 bg-green white', className)}
      {...props}
    >
      <div
        className={classNames('flex items-center justify-center f5 b', {
          mb3: !!children,
        })}
      >
        <FontAwesomeIcon icon={faBacon} />
        <span className="lh-title ml3">{title || 'Unknown error'}</span>
      </div>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
