import React from 'react';
import { Spinner } from 'react-bootstrap';

import { Heading, MainSection } from 'src/atoms/';
import { QuackForm } from 'src/molecules/';
import { QuackList } from 'src/organisms/';

export function HomeTemplate({
  data,
  loading,
  error,
  refetchQuacks,
  quackFormState,
  currentUser,
}) {
  return (
    <>
      <>
        <Heading>Home</Heading>

        {currentUser && <QuackForm {...quackFormState} />}

        {data && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {/* 
        <QuackList
          quacks={data && data.quacks}
          isLoading={loading}
          error={error}
          refetch={refetchQuacks}
        />
        */}
      </>
    </>
  );
}
