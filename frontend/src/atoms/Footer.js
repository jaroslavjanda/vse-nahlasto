import React from 'react';
import { route } from 'src/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Footer({ className, error, ...rest }) {
  return (
    <footer id="footer">
      <div className="container">
        <div className="col col-md-auto text-center">
          <small><a href={route.termsOfService()} style={{color: "white"}}>Smluvní podmínky</a></small><br/>
          <small className="text-muted">©2020 Nahlaš.To</small>
        </div>
      </div>
    </footer>
  );
}
