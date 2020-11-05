import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import 'tachyons';

import './index.css';
import { App } from 'src/App';

const render = () => {
  ReactDOM.render(
    <Router history={history}>
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
serviceWorker.unregister();