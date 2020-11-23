import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export function Footer({ className, error, ...rest }) {
    return (    
<footer id="footer">
<div className="container">
    <div className="col col-md-auto text-center">
      <small className="text-muted">©2020 Nahlaš.To 
      </small>
  </div>
</div>
</footer>
    );
  }
  