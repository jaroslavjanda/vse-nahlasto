import React from 'react';
import { Button } from 'src/atoms';

export function JoinPrivateCommunityRequestPage({ match }) {

  const communityId = parseInt(match.params.communityId)
  const userEmail = match.params.email
  const code = parseInt(match.params.code)


  // TODO 1: overit ze code je stale validni, pokud ne, neukazat stranku s potvrzovacim tlacitkem
  // TODO 2: admin komunity by mel byt na teto strance automaticky prihlasen
  // TODO 3: mutace na potvrzeni pozadavku
  // TODO 4: hezci FE

  return (
    <div className="mw6 center">
      <div>
        Kliknutím na tlačítko níže povrdíte přístup uživateli k Vaší privátní komunitě.
        ID komunity: { communityId },
        user email: { userEmail },
        code: { code }
      </div>
      <Button type="submit" className="mt2 mb3">
        Potvrdit žádost
      </Button>
    </div>
  );
}
