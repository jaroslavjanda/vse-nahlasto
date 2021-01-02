import React from 'react';
import { useHistory } from 'react-router-dom';

import { ErrorBanner } from './ErrorBanner';
import { errorMessage } from '../utils/Error';
import { Button } from './Button';

export const ErrorBannerWithRefreshButton = ({ errorType }) => {
  const history = useHistory();
  return (
    <ErrorBanner title={errorMessage(errorType)}>
      <Button color="red" onClick={() => history.go(0)}>
        Načíst znovu
      </Button>
    </ErrorBanner>
  );
};
