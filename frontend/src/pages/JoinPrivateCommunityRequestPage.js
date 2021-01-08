import { gql, useQuery, useMutation } from '@apollo/client';
import { ErrorBanner, Loading, SuccessBanner } from '../atoms';
import { useState } from 'react';


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

export function JoinPrivateCommunityRequestPage({ match }) {

  const [isCodeValid, setIsCodeValid] = useState(null)

  const communityId = parseInt(match.params.communityId)
  const userEmail = match.params.email.toString()
  const code = parseInt(match.params.code)

  const codeValidation = useQuery(CODE_VALIDATION_QUERY, {
    variables: { communityId, userEmail, code },
    onCompleted: ( data ) => {
      if (data.validateJoinCommunityRequestCode?.code !== undefined) {
        requestHandlingMutation({ variables: { userEmail, communityId } })
        setIsCodeValid(true)
      } else {
        setIsCodeValid(false)
      }
    }
  })

  const [requestHandlingMutation] = useMutation(
    HANDLE_VALID_REQUEST_MUTATION,
    {
      onCompleted: () => {
        console.log("done")
      },
      onError: (error) => {
        console.error(error)
      },
    },
  );

  return (
    <div className="mw6 center">
      {(isCodeValid == null || codeValidation.loading) && <Loading />}
      {!codeValidation.loading && isCodeValid && (
        <SuccessBanner title={'Požadavek byl potvrzen'} className="mb3">
          Uživatel { userEmail } byl přidán do komunity s ID { communityId }.
        </SuccessBanner>

        )}
      {!codeValidation.loading && !isCodeValid && (
        <ErrorBanner title="Neplatný odkaz.">
          Je nám líto, ale tento odkaz je neplatný.
        </ErrorBanner>
      )
      }
    </div>
  );
}
