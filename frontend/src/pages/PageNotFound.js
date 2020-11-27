import React from 'react';

import { Link } from 'src/atoms/';
import { Placeholder } from 'src/templates/Placeholder';
import { route } from 'src/Routes';

export function PageNotFound() {
  return (
    <Placeholder title="Error 404">
      <p>
        Stránka nebyla nalezena, vraťte se prosím na <Link to={route.home()}>Domů</Link>.
      </p>
    </Placeholder>
  );
}
