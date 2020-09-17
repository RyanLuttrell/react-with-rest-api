import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from './Context';
import App from './App';

ReactDOM.render(

// TO DO
// Add the PROVIDER opening and closing tags around the App componenet
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);

