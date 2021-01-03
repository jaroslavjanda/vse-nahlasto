import React from 'react';
import { route } from 'src/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Footer({ className, error, ...rest }) {
  return (
    <footer id="footer">
      <div className="container">
        <div className="col col-md-auto text-center">
          <a href={route.termsOfService()}>Smluvní podmínky</a><br/>
          <p className="text-muted">©2020 Nahlaš.To</p>
        </div>
      </div>
    </footer>
  );
}
