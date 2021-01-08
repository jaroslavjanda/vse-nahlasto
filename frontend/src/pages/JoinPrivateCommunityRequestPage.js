import { gql, useQuery, useMutation } from '@apollo/client';
import { ErrorBanner, Loading, SuccessBanner } from '../atoms';
import { useAuth } from 'src/utils/auth';

const CODE_VALIDATION_QUERY = gql`
  query CodeValidation($communityId: Int!, $userEmail: String!, $code: Int!) {
    validateJoinCommunityRequestCode(
      communityId: $communityId
      applicant_email: $userEmail
      code: $code
    ) {
      code
    }
  }
`;

const HANDLE_VALID_REQUEST_MUTATION = gql`
  mutation HandleValidRequestMutation($userEmail: String!, $communityId: Int!) {
    handleValidJoinPrivateCommunityRequest(
      userEmail: $userEmail
      communityId: $communityId
    ) {
      communityId
    }
  }
`;

export function JoinPrivateCommunityRequestPage({ match }) {
  // FIXME signout immediately, do not load name into the top bar
  const { signout } = useAuth();
  signout();

  function validateCode(codeValidation) {
    if (
      codeValidation.data?.validateJoinCommunityRequestCode?.code === undefined
    ) {
      if (!codeValidation.loading) {
        return false;
      }
    } else {
      // FIXME the mutation is called multiple times with errors (duplicated inserts) - why?
      // use some hook ore something?
      requestHandlingMutation({ variables: { userEmail, communityId } });
      return true;
    }
  }

  const communityId = parseInt(match.params.communityId);
  const userEmail = match.params.email.toString();
  const code = parseInt(match.params.code);

  const codeValidation = useQuery(CODE_VALIDATION_QUERY, {
    variables: { communityId, userEmail, code },
  });

  const [requestHandlingMutation] = useMutation(HANDLE_VALID_REQUEST_MUTATION, {
    onCompleted: () => {
      console.log('done');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="mw6 center">
      {codeValidation.loading && <Loading />}
      {!codeValidation.loading && validateCode(codeValidation) && (
        <SuccessBanner title={'Požadavek byl potvrzen'} className="mb3">
          Uživatel {userEmail} byl přidán do komunity s ID {communityId}.
        </SuccessBanner>
      )}
      {!codeValidation.loading && !validateCode(codeValidation) && (
        <ErrorBanner title="Neplatný odkaz.">
          Je nám líto, ale tento odkaz je neplatný.
        </ErrorBanner>
      )}
    </div>
  );
}
