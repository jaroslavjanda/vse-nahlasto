import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './App';
import { EnhancedAppoloProvider } from './utils/apollo';
import { AuthProvider } from './utils/auth';

import 'tachyons';
import './index.css';

const render = () => {
  ReactDOM.render(
    <Router>
      <AuthProvider>
        <EnhancedAppoloProvider>
          <App />
        </EnhancedAppoloProvider>
      </AuthProvider>
    </Router>,
    document.getElementById('root'),
  );
};

if (module.hot) {
  module.hot.accept('./App', render);
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
