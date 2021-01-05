import React, { useCallback, useEffect, useMemo } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { ErrorBanner, Loading, SuccessBanner } from '../atoms';
import { useAuth } from '../utils/auth';

const CODE_VALIDATION_QUERY = gql`
    query CodeValidation($communityId: Int!, $userEmail: String!, $code: Int!) {
      validateJoinCommunityRequestCode(communityId: $communityId, applicant_email: $userEmail, code: $code) {
        code
      }
    }
`

const HANDLE_VALID_REQUEST_MUTATION = gql`
  mutation HandleValidRequestMutation($userEmail: String!, $communityId: Int!) {
    handleValidJoinPrivateCommunityRequest(userEmail: $userEmail, communityId: $communityId) {
      communityId
    }
  }
`;

var isCodeValid = false

function validateCode(codeValidation) {
  if (codeValidation.data?.validateJoinCommunityRequestCode?.code === undefined) {
    if (!codeValidation.loading) {
      isCodeValid = false
      return false
    }
  } else {
    isCodeValid = true
    return true
  }
}

export function JoinPrivateCommunityRequestPage({ match }) {

  const auth = useAuth();
  auth.signout()

  const communityId = parseInt(match.params.communityId)
  const userEmail = match.params.email.toString()
  const code = parseInt(match.params.code)

  const codeValidation = useQuery(CODE_VALIDATION_QUERY, {
    variables: { communityId, userEmail, code }
  })

  const [requestHandlingMutation] = useMutation(
    HANDLE_VALID_REQUEST_MUTATION,
    {
      onCompleted: () => {
        console.log("done")
        return true
      },
      onError: (error) => {

        console.error(error)
        return false
      },
    },
  );

  useEffect(() => {
    console.log("effect used")
    if(isCodeValid)
      requestHandlingMutation({ variables: { userEmail, communityId } })
    },
    [isCodeValid],
  );

  return (
    <div className="mw6 center">
      {codeValidation.loading && <Loading />}
      {!codeValidation.loading && validateCode(codeValidation) && (
          // handleRequestHandlingMutation
        <SuccessBanner title={'Požadavek byl potvrzen'} className="mb3">
          Uživatel { userEmail } byl přidán do komunity s ID { communityId }.
          Z důvodu bezpečnosti jste byli odhlášeni.
        </SuccessBanner>

        )}
      {!codeValidation.loading && !validateCode(codeValidation) && (
        <ErrorBanner title="Neplatný odkaz.">
          Je nám líto, ale tento odkaz je neplatný.
          Z důvodu bezpečnosti jste byli odhlášeni.
        </ErrorBanner>
      )
      }
    </div>
  );
}
