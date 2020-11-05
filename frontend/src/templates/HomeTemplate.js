import React from 'react';

import { Heading, MainSection } from 'src/atoms/';
import { QuackForm, ReloadButton } from 'src/molecules/';
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
          <ReloadButton
            isLoading={loading}
            onClick={() => refetchQuacks()}
            className="fr"
          />
        )}

        <QuackList
          quacks={data && data.quacks}
          isLoading={loading}
          error={error}
          refetch={refetchQuacks}
        />
      </>
    </>
  );
}
