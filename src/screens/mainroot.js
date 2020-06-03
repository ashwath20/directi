import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(
    <React.StrictMode>
      <Provider store={custStrore}>
      <index />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')

  );serviceWorker.unregister();