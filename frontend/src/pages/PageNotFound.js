import React from 'react'

import { Link } from 'src/atoms/'
import { Placeholder } from 'src/templates/Placeholder'
import { route } from 'src/Routes'

export function PageNotFound() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Placeholder title="Error 404">
        <p>
          Stránka nebyla nalezena, vraťte se prosím {' '}
          <Link to={route.home()}>Domů</Link>.
        </p>
      </Placeholder>
    </div>
  )
}
