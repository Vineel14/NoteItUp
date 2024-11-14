import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainApp from './MainApp';
import { Provider } from 'react-redux';
import store from './store'; // Import the store here
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Provide the store to your app */}
      <MainApp />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
